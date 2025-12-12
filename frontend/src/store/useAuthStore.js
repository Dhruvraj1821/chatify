import {create } from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";

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
        } catch(error){
            console.log("Error in authCheck: ",error);
            set({authUser:null});
        } finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", formData);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
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
            await axiosInstance.post("/auth/logout");
            set({ authUser: null, socket: null, onlineUsers: [] });
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Error in logout:", error);
            // Even if API call fails, clear local state
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