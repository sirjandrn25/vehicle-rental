type userRole = "USER" | "ADMIN" | "VENDOR" | "STAFF";
export type userType = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role: userRole;
    verified: boolean;
    default_address_id?: string;
};
