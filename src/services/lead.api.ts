import { Lead } from "../types";

const BASE_URL = "http://localhost:5000/api/v1/leads";

export const leadApi = {
    async getAll(): Promise<Lead[]> {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch leads");
        return res.json();
    },

    async create(data: Partial<Lead>): Promise<Lead> {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Failed to create lead");
        return res.json();
    },

    async update(id: string, data: Partial<Lead>): Promise<Lead> {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Failed to update lead");
        return res.json();
    },

    async delete(id: string): Promise<void> {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete lead");
    },
};