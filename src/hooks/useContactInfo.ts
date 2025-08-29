import { useState, useEffect } from "react";
import { contactInfoApi } from "@/lib/api-services";
import { ContactInfo } from "@/lib/api";

interface UseContactInfoOptions {
  public?: boolean;
  type?: string;
}

export const useContactInfo = (options?: UseContactInfoOptions) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const response = await contactInfoApi.getAll({
          is_public: options?.public,
          type: options?.type,
        });
        setContactInfo(response.data?.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch contact information");
        console.error("Error fetching contact information:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, [options?.public, options?.type]);

  // Helper functions to filter contact info by type
  const getByType = (type: string) => 
    contactInfo.filter(contact => contact.type === type && contact.is_public);

  const getPrimaryByType = (type: string) => 
    contactInfo.find(contact => contact.type === type && contact.is_primary && contact.is_public);

  const getPublicContacts = () => 
    contactInfo.filter(contact => contact.is_public);

  // Specific helpers for common contact types
  const phones = getByType('phone');
  const emails = getByType('email');
  const addresses = getByType('address');
  const websites = getByType('website');
  const faxes = getByType('fax');

  const primaryPhone = getPrimaryByType('phone');
  const primaryEmail = getPrimaryByType('email');
  const primaryAddress = getPrimaryByType('address');
  const primaryWebsite = getPrimaryByType('website');
  const primaryFax = getPrimaryByType('fax');

  return { 
    contactInfo,
    loading, 
    error,
    getByType,
    getPrimaryByType,
    getPublicContacts,
    phones,
    emails,
    addresses,
    websites,
    faxes,
    primaryPhone,
    primaryEmail,
    primaryAddress,
    primaryWebsite,
    primaryFax
  };
};

export default useContactInfo;