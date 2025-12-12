import {create } from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set) => ({
    authUser:null,
    isCheckingAuth:true,
    isLoggingIn: false,
    isSigningUp: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            // Initialize socket connection if user is authenticated
            if (res.data) {
                initializeSocket();
            }
        } catch(error){
            console.log("Error in authCheck: ",error);
            set({authUser:null});
        } finally{
            set({isCheckingAuth: false});
        }
    },

    initializeSocket: () => {
        const { authUser, socket } = useAuthStore.getState();
        
        // Disconnect existing socket if any
        if (socket) {
            socket.disconnect();
        }

        // Get JWT token from cookies
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };

        const token = getCookie('jwt');
        
        if (!token || !authUser) {
            return;
        }

        const socketURL = import.meta.env.MODE === "development" 
            ? "http://localhost:3000" 
            : "";

        const newSocket = io(socketURL, {
            auth: {
                token: token,
            },
            transports: ['websocket', 'polling'],
        });

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        newSocket.on("onlineUsers", (users) => {
            set({ onlineUsers: users });
        });

        newSocket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });

        set({ socket: newSocket });
    },

    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", formData);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
            // Initialize socket connection
            useAuthStore.getState().initializeSocket();
            // Navigate will be handled by route protection
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to create account";
            toast.error(errorMessage);
            throw error;
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", formData);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
            // Initialize socket connection
            useAuthStore.getState().initializeSocket();
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Invalid credentials";
            toast.error(errorMessage);
            throw error;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            const { socket } = useAuthStore.getState();
            // Disconnect socket
            if (socket) {
                socket.disconnect();
            }
            await axiosInstance.post("/auth/logout");
            set({ authUser: null, socket: null, onlineUsers: [] });
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Error in logout:", error);
            // Even if API call fails, clear local state
            const { socket } = useAuthStore.getState();
            if (socket) {
                socket.disconnect();
            }
            set({ authUser: null, socket: null, onlineUsers: [] });
        }
    },

    updateProfile: async (profileData) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", profileData);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update profile";
            toast.error(errorMessage);
            throw error;
        }
    },
}));