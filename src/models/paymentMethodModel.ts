import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { Query, ID } from 'node-appwrite';
import { PaymentMethod } from '../types/models';

export class PaymentMethodModel {
    static async create(paymentData: Omit<PaymentMethod, '$id'>): Promise<PaymentMethod> {
        try {
            const paymentMethod = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.PAYMENT_METHODS,
                ID.unique(),
                {
                    method: paymentData.method,
                    details: paymentData.details || null
                }
            );
            return paymentMethod as unknown as PaymentMethod;
        } catch (error) {
            throw new Error(`Failed to create payment method: ${error}`);
        }
    }

    static async getById(id: string): Promise<PaymentMethod> {
        try {
            const paymentMethod = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.PAYMENT_METHODS,
                id
            );
            return paymentMethod as unknown as PaymentMethod;
        } catch (error) {
            throw new Error(`Failed to get payment method: ${error}`);
        }
    }

    static async update(id: string, paymentData: Partial<PaymentMethod>): Promise<PaymentMethod> {
        try {
            const paymentMethod = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.PAYMENT_METHODS,
                id,
                paymentData
            );
            return paymentMethod as unknown as PaymentMethod;
        } catch (error) {
            throw new Error(`Failed to update payment method: ${error}`);
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.PAYMENT_METHODS,
                id
            );
        } catch (error) {
            throw new Error(`Failed to delete payment method: ${error}`);
        }
    }

    static async list(queries: string[] = []): Promise<PaymentMethod[]> {
        try {
            const paymentMethods = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.PAYMENT_METHODS,
                queries
            );
            return paymentMethods.documents as unknown as PaymentMethod[];
        } catch (error) {
            throw new Error(`Failed to list payment methods: ${error}`);
        }
    }
}
