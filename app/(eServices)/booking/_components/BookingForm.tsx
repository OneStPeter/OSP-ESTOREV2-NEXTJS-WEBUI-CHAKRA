"use client";

import { useEffect, useRef, useState } from "react";

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
import Page from "@/components/layout/page/Page";

interface BookingFormProps {
  successLink?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ successLink }) => {
  const requestId = "RR-123456";

  useEffect(() => {
    setCurrentStep(0);
  }, []);

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

  const formTopRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    formTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // --- STEPS DATA ---
  const stepsData = [
    {
      title: "Location",
      icon: FaMapMarkerAlt,
      content: (
        <BookingLocation
          onSelectChapel={(chapel) => {
            setSelectedChapel(chapel);
            setTimeout(scrollToTop, 0);
            // go to 2nd step (index 1)
            // setCurrentStep(1);
          }}
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
            deceasedMiddleName: "O.",
            deceasedLastName: "Dela Cruz",
            deceasedSuffix: "",
            contactFirstName: "Juanito",
            contactMiddleName: "O.",
            contactLastName: "Dela Cruz",
            contactSuffix: "Sr.",
            relationship: "Father",
            email: "restituto@gmail.com",
            mobile: "+639123456789",
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

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Page.Root title="" description="" hideBackButton>
      <Page.MainContent>
        <Page.Row>
          <FormSteps
            stepsData={stepsData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            title="Memorial Service Booking"
            description="Book with Care and Clarity"
            submitButtonText="Confirm Booking"
            onStepsComplete={() => {}}
          />
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default BookingForm;
