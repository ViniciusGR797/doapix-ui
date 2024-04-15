import { toast } from "react-toastify";

interface ValidationErrors {
    [key: string]: string[];
}

interface ValidationRules {
    [key: string]: (value: any) => string | null;
}

export function validateFields(fields: Record<string, any>): string | null {
    const validationRules: ValidationRules = {
        name: (value) => {
            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
            if (!value || value.trim().length === 0) {
                return "Preencha o nome";
            }
            else if (!nameRegex.test(value)) {
                return "Nome contém caracteres inválidos";
            }
            return null;
        },
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || value.trim().length === 0) {
                return "Preencha o email";
            }
            else if (!emailRegex.test(value)) {
                return "Email inválido";
            }
            return null;
        },
        pwd: (value) => {
            const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!value || value.trim().length === 0) {
                return "Preencha a senha";
            }
            else if (!pwdRegex.test(value)) {
                return "Senha fraca. A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@ $ ! % * ? &)";
            }
            return null;
        },
        pix: (value) => {
            const randomKeyRegex = /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.pix_key || value.pix_key.trim().length === 0) {
                return "Preencha a chave pix";
            }
            else if (!value.pix_key_type || value.pix_key_type.trim().length === 0) {
                return "Selecione um tipo de chave pix";
            }

            value.pix_key = value.pix_key.replace(/\.|_|-|\//g, "")

            if (value.pix_key_type === "CPF" && value.pix_key.length !== 11
                || value.pix_key_type === "CNPJ" && value.pix_key.length !== 14
                || value.pix_key_type === "Telefone" && value.pix_key.length !== 11
                || value.pix_key_type === "Telefone" && !emailRegex.test(value.pix_key)
            ) {
                return "Pix key inválido. A pix key deve ser um " + value.pix_key_type;
            }
            else if (value.pix_key_type === "Aleatória" && !randomKeyRegex.test(value.pix_key)) {
                return "Pix key inválido. A pix key deve ser uma Chave aleatória";
            }
            return null;
        },

    };

    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            const value = fields[key];
            const validationFunction = validationRules[key];
            if (validationFunction) {
                const errorMessage = validationFunction(value);
                if (errorMessage) {
                    return errorMessage;
                }
            }
        }
    }

    return null;
}
