import { create } from "zustand";
import { CustomField } from "../types";
import { MOCK_CUSTOM_FIELDS } from "../constants";

type Store = {
    fields: CustomField[];

    addField: (data: Partial<CustomField>) => void;
    updateField: (id: string, data: Partial<CustomField>) => void;
    deleteField: (id: string) => void;
};

export const useCustomFieldStore = create<Store>((set) => ({
    fields: MOCK_CUSTOM_FIELDS,

    addField: (data) => {
        const newField: CustomField = {
            id: crypto.randomUUID(),
            name: data.name || "custom_field",
            label: data.label || "Custom Field",
            type: data.type || "text",
            entity: data.entity || "HOUSE",
            options: data.options,
            defaultValue: data.defaultValue,
        };

        set((state) => ({
            fields: [newField, ...state.fields],
        }));
    },

    updateField: (id, data) =>
        set((state) => ({
            fields: state.fields.map((f) =>
                f.id === id ? { ...f, ...data } : f
            ),
        })),

    deleteField: (id) =>
        set((state) => ({
            fields: state.fields.filter((f) => f.id !== id),
        })),
}));