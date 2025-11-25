import {
  Text,
  Select,
  Input,
  Box,
  VStack,
  Grid,
  createListCollection,
  FileUpload,
  Field,
  Separator,
} from "@chakra-ui/react";
import FloatingLabelInput from "../ui/floating-label-input";
// Removed FloatingLabelSelect usage in favor of placeholder Selects

const LifePlanApplication1 = () => {
  const idCollection = createListCollection({
    items: [
      { label: "Passport", value: "passport" },
      { label: "Driver's License", value: "driver_license" },
      { label: "National ID", value: "national_id" },
    ],
  });

  return (
    <>
      <VStack mb={4} align="stretch">
        <Text fontWeight="semibold" fontSize="lg">
          Identification
        </Text>
      </VStack>

      <VStack gap={6} align="stretch">
        {/* Identification Section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Select.Root collection={idCollection}>
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select ID Type" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {idCollection.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>

          <FileUpload.Root>
            <FileUpload.HiddenInput />
            <Input asChild>
              <FileUpload.Trigger>
                <FileUpload.FileText />
              </FileUpload.Trigger>
            </Input>
          </FileUpload.Root>
        </Grid>

        <Separator />

        {/* Full Name Section */}
        <Text fontWeight="semibold" fontSize="md">
          Full Name
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput id="lastName" type="text" label="Last Name" />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput id="firstName" type="text" label="First Name" />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="middleName"
              type="text"
              label="Middle Name"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="suffix"
              type="text"
              label="Suffix (Optional)"
            />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Personal Data Section */}
        <Text fontWeight="semibold" fontSize="md">
          Personal Details
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="dateOfBirth"
              type="date"
              label="Date of Birth"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="dateOfNeutralization"
              type="date"
              label="Date of Neutralization"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput id="height" label="Height (inches)" />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput id="weight" label="Weight (lbs)" />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Demographics Section (using placeholder Select) */}
        <Text fontWeight="semibold" fontSize="md">
          Demographics
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2 , 1fr)" }} gap={8}>
          <Field.Root>
            <Select.Root
              collection={createListCollection({
                items: [
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ],
              })}
            >
              <Select.HiddenSelect id="gender" />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Gender" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {createListCollection({
                    items: [
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ],
                  }).items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Select.Root
              collection={createListCollection({
                items: [
                  { label: "Single", value: "single" },
                  { label: "Married", value: "married" },
                  { label: "Widowed", value: "widowed" },
                  { label: "Divorced", value: "divorced" },
                  { label: "Separated", value: "separated" },
                  { label: "Annulled", value: "annulled" },
                ],
              })}
            >
              <Select.HiddenSelect id="civilStatus" />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Civil Status" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {createListCollection({
                    items: [
                      { label: "Single", value: "single" },
                      { label: "Married", value: "married" },
                      { label: "Widowed", value: "widowed" },
                      { label: "Divorced", value: "divorced" },
                      { label: "Separated", value: "separated" },
                      { label: "Annulled", value: "annulled" },
                    ],
                  }).items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="nationality"
              type="text"
              label="Nationality"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
        </Grid>

        <Separator />

        {/* Basic Contact Info */}
        <Text fontWeight="semibold" fontSize="md">
          Contact Information
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="mobileNumber"
              type="text"
              label="Mobile Number"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="landlineNumber"
              type="text"
              label="Landline Number"
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput id="email" type="email" label="Email Address" />
            <Field.ErrorText>Enter a valid email</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="mailingAddress"
              type="text"
              label="Mailing Address"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
        </Grid>

        <Separator />

        {/* Insurability */}
        {/* <Text fontWeight="semibold" fontSize="md">
          Insurability
        </Text> */}

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="insurability"
              type="text"
              label="Insurability"
              value="Insurable"
              readOnly
            />
          </Field.Root>
        </Grid>
      </VStack>
    </>
  );
};

export default LifePlanApplication1;
