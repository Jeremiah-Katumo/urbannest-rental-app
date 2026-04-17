import React, { createContext, useContext, useState, useCallback } from "react";
import { CustomField } from "../types";
import { MOCK_CUSTOM_FIELDS } from "../constants";

type CustomFieldContextType = {
    fields: CustomField[];
    setFields: React.Dispatch<React.SetStateAction<CustomField[]>>;

    handleAddField: (field: CustomField) => void;
    handleUpdateField: (id: string, data: Partial<CustomField>) => void;
    handleDeleteField: (id: string) => void;
};

const CustomFieldContext = createContext<CustomFieldContextType | null>(null);

export const CustomFieldProvider = ({ children }: { children: React.ReactNode }) => {
    const [fields, setFields] = useState<CustomField[]>(MOCK_CUSTOM_FIELDS);
    const [editingField, setEditingField] = useState<CustomField | null>(null);

    const handleAddField = useCallback((fieldData: Partial<CustomField>) => {
        if (editingField?.id) {
            setFields((prev) => prev.map(cf =>
                cf.id === editingField.id ? { ...cf, ...fieldData } : cf
            ))
        } else {
            const newField: CustomField = {
                id: crypto.randomUUID(),
                name: fieldData.name || 'custom_field',
                label: fieldData.label || 'Custom Field',
                type: fieldData.type || 'text',
                entity: fieldData.entity || 'HOUSE',
                options: fieldData.options,
                defaultValue: fieldData.defaultValue
            }
            setFields([newField, ...fields]);
        }
        setEditingField(null);
    }, [editingField]);

    const handleUpdateField = useCallback((fieldId: string, fieldData: Partial<CustomField>) => {
        setFields(prev =>
            prev.map(f => (f.id === fieldId ? { ...f, ...fieldData } : f))
        );
    }, []);

    const handleDeleteField = useCallback((fieldId: string) => {
        if (confirm('Are you sure you want to delete this custom field?')) {
            setFields(prev => prev.filter(f => f.id !== fieldId));
        }
    }, []);

    return (
        <CustomFieldContext.Provider
            value={{ fields, setFields, handleAddField, handleUpdateField, handleDeleteField }}
        >
            {children}
        </CustomFieldContext.Provider>
    );
};

export const useCustomFieldContext = () => {
    const ctx = useContext(CustomFieldContext);
    if (!ctx) throw new Error("useCustomFieldContext must be used within CustomFieldProvider");
    return ctx;
};