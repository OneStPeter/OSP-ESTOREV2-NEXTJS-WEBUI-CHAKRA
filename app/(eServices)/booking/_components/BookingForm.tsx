"use client";

import { useState } from "react";

import ReviewSubmitStep from "./ReviewSubmitStep";

import {
  FaClipboardCheck,
  FaLock,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import BookingLocation from "./BookingLocation";
import FormSteps from "./FormSteps";
import OTPVerification from "./OTPVerification";
import DeceasedContactFormStep from "./DeceasedContactFormStep";

interface BookingFormProps {
  successLink?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ successLink }) => {
  const requestId = "RR-123456";

  // --- STATE ---
  const [step, setStep] = useState(0);
  const [selectedChapel, setSelectedChapel] = useState<{
    id: number;
    name: string;
    address: string;
    contacts: string[];
  } | null>(null);

  const [retrievalLocation, setRetrievalLocation] = useState(
    "St. Peter Corporate Center, 999, EDSA, Veterans Village, Project 7, 1st District, Quezon City, Eastern Manila District, Metro Manila, 1105, Philippines",
  );

  // --- STEPS DATA ---
  const stepsData = [
    {
      title: "Location",
      icon: FaMapMarkerAlt,
      content: (
        <BookingLocation
          onSelectChapel={setSelectedChapel}
          onLocationChange={setRetrievalLocation}
        />
      ),
      validateBeforeNext: () => {
        if (!selectedChapel) {
          alert("Please select a chapel before proceeding.");
          return false;
        }
        return true;
      },
    },
    {
      title: "Personal",
      icon: FaUser,
      content: <DeceasedContactFormStep />,
    },
    {
      title: "Review",
      icon: FaClipboardCheck,
      content: (
        <ReviewSubmitStep
          selectedChapel={selectedChapel?.name ?? ""}
          chapelAddress={selectedChapel?.address ?? ""}
          chapelContacts={selectedChapel?.contacts ?? []}
          retrievalLocation={retrievalLocation}
          formData={{
            deceasedFirstName: "Juan",
            deceasedMiddleName: "Ocampo",
            deceasedLastName: "Dela Cruz",
            deceasedSuffix: "Jr",
            contactFirstName: "Restituto",
            contactMiddleName: "Ocampo",
            contactLastName: "Dela Cruz",
            relationship: "Father",
            email: "restituto@gmail.com",
            mobile: "09123456789",
          }}
        />
      ),
    },
    {
      title: "OTP",
      icon: FaLock,
      content: <OTPVerification successLink={successLink + requestId} />,
    },
  ];

  return (
    <FormSteps
      title="Memorial Service Booking"
      description="A guided journey to book a memorial service with care and clarity."
      stepsData={stepsData}
    />
  );
};

export default BookingForm;
