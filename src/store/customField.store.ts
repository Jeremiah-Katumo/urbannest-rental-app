import { create } from "zustand";
import { CustomField } from "../types";
import { MOCK_CUSTOM_FIELDS } from "../constants";

type CustomFieldState = {
    fields: CustomField[];
    editingField: CustomField | null;

    setFields: (fields: CustomField[]) => void;
    setEditingField: (field: CustomField | null) => void;

    addField: (fieldData: Partial<CustomField>) => void;
    updateField: (id: string, data: Partial<CustomField>) => void;
    deleteField: (id: string) => void;
};

export const useCustomFieldStore = create<CustomFieldState>((set, get) => ({
    fields: MOCK_CUSTOM_FIELDS,
    editingField: null,

    setFields: (fields) => set({ fields }),
    setEditingField: (field) => set({ editingField: field }),

    addField: (fieldData) => {
        const { fields, editingField } = get();

        if (editingField?.id) {
            set({
                fields: fields.map(f =>
                    f.id === editingField.id ? { ...f, ...fieldData } : f
                ),
                editingField: null,
            });
        } else {
            const newField: CustomField = {
                id: crypto.randomUUID(),
                name: fieldData.name || "custom_field",
                label: fieldData.label || "Custom Field",
                type: fieldData.type || "text",
                entity: fieldData.entity || "HOUSE",
                options: fieldData.options,
                defaultValue: fieldData.defaultValue,
            };

            set({
                fields: [newField, ...fields],
                editingField: null,
            });
        }
    },

    updateField: (id, data) => {
        set(state => ({
            fields: state.fields.map(f =>
                f.id === id ? { ...f, ...data } : f
            ),
        }));
    },

    deleteField: (id) => {
        if (confirm("Are you sure you want to delete this custom field?")) {
            set(state => ({
                fields: state.fields.filter(f => f.id !== id),
            }));
        }
    },
}));