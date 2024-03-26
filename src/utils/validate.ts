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
        pix_key: (value) => {
            const pixKeyRegex = /^(?:\d{11}|\d{14}|\d{10,11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})$/;
            if (!value || value.trim().length === 0) {
                return "Preencha a chave pix";
            }
            else if (!pixKeyRegex.test(value)) {
                return "Pix key inválido. A pix key deve ser um CPF, CNPJ, Número de telefone, Email ou Chave aleatória";
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
