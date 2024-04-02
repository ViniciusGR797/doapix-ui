import { createContext, ReactNode, useState, useEffect } from 'react';
import Router from 'next/router';
import { api } from '@/services/apiClient';
import { toast } from 'react-toastify';

type DonationContextData = {
    donation: DonationProps | undefined;
    createDonation: (data: CreateDonationProps) => Promise<void>;
    updateDonation: (id: string, data: UpdateDonationProps) => Promise<void>;
    deleteDonation: (id: string) => Promise<void>;
    getAllDonations: () => Promise<void>;
    getDonationById: (id: string) => Promise<void>;
}

type DonationProps = {
    id: string;
    name: string;
    description: string;
    goal: string;
    url_image: string;
    deadline: Date;
    created_at: Date;
    state: string;
    category: string;
    user_id: string;
}

type CreateDonationProps = {
    name: string;
    goal: string;
    deadline: Date;
    state: string;
    category: string;
    description: string;
}

type UpdateDonationProps = CreateDonationProps;

type GetDonationByIdProps = {
    id: string;
}

type DonationProviderProps = {
    children: ReactNode;
}

export const DonationContext = createContext({} as DonationContextData);

export function DonationProvider({ children }: DonationProviderProps) {
  const [donation, setDonation] = useState<DonationProps>();

  async function createDonation(data: CreateDonationProps): Promise<void> {
    return;
  }

  async function updateDonation(id: string, data: UpdateDonationProps): Promise<void> {
    return;
  }

  async function deleteDonation(id: string): Promise<void> {
    return;
  }

  async function getAllDonations(): Promise<void> {
    return;
  }

  async function getDonationById(id: string): Promise<void> {
    return;
  }

  return (
    <DonationContext.Provider value={{ donation, createDonation, updateDonation, deleteDonation, getAllDonations, getDonationById }}>
      {children}
    </DonationContext.Provider>
  );
}