import Beneficiary from "@/components/steps/beneficiary";
import Confirmation from "@/components/steps/confirmation";
import HealthDeclaration from "@/components/steps/health-declaration";
import LifePlanApplicationWrapper from "@/components/steps/lifeplan-application-wrapper";
import Requirements from "@/components/steps/upload-requirements";
export const steps = [
  {
    id: "1",
    header: "Life Plan Application",
    title: "Application",
    description: "Complete the application form",
    component: <LifePlanApplicationWrapper />,
  },

  {
    id: "2",
    header: "Beneficiary Details",
    title: "Beneficiary",
    description: "Add Beneficiary Details",
    component: <Beneficiary />,
  },
  {
    id: "3",
    header: "Health Declaration & Terms and Conditions",
    title: "Terms",
    description: "Health Declaration & Terms and Conditions",
    component: <HealthDeclaration />,
  },
  {
    id: "4",
    header: "Upload Requirements",
    title: "Requirements",
    description: "Upload Requirements",
    component: <Requirements />,
  },
  {
    id: "5",
    header: "Review Summary",
    title: "Summary",
    description: "Review and confirm your application",
    component: <Confirmation />,
  },
];
