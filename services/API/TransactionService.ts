import { api } from "@/services/API/MainAPIClient";
import { ITransactionData } from "@/types/planholder";

/**
 * TransactionService
 * ------------------
 * Saves the life plan application (personal info, address, beneficiaries, ...) through the C# API.
 *
 * Example:
 *   await TransactionService.insert(applicationData);
 */

const ENDPOINTS = {
  insert: "/api/EstoreV2/PostInsertTransaction",
};

export const TransactionService = {
  async insert(data: ITransactionData) {
    return await api.post<unknown, ITransactionData>(ENDPOINTS.insert, data);
  },
};
