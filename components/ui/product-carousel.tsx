"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { Box, Flex, Button, IconButton } from "@chakra-ui/react";
import { cn } from "@/lib/utils/plan";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function ProductCarousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <Box
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </Box>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <Box ref={carouselRef} overflow="hidden" data-slot="carousel-content">
      <Flex
        className={className}
        direction={orientation === "horizontal" ? "row" : "column"}
        align="stretch"
        {...props}
      />
    </Box>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <Box
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      minW={0}
      flexShrink={0}
      flexGrow={0}
      flexBasis="100%"
      pl={orientation === "horizontal" ? 4 : 0}
      pt={orientation === "vertical" ? 4 : 0}
      className={className}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  const commonPos = {
    position: "absolute" as const,
    borderRadius: "full",
  };

  return (
    <Button
      aria-label="Previous slide"
      data-slot="carousel-previous"
      variant={variant as any}
      size={size as any}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      display={{ base: "none", md: "block" }}
      {...(orientation === "horizontal"
        ? {
            ...commonPos,
            top: "50%",
            left: { base: -4, md: -6 },
            transform: "translateY(-50%)",
          }
        : {
            ...commonPos,
            top: -48,
            left: "50%",
            transform: "translateX(-50%) rotate(90deg)",
          })}
      className={className}
      {...props}
    >
      <IoChevronBack />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  const commonPos = {
    position: "absolute" as const,
    borderRadius: "full",
  };

  return (
    <Button
      aria-label="Next slide"
      data-slot="carousel-next"
      variant={variant as any}
      size={size as any}
      disabled={!canScrollNext}
      onClick={scrollNext}
      display={{ base: "none", md: "block" }}
      {...(orientation === "horizontal"
        ? {
            ...commonPos,
            top: "50%",
            right: { base: -4, md: -6 },
            transform: "translateY(-50%)",
          }
        : {
            ...commonPos,
            bottom: -48,
            left: "50%",
            transform: "translateX(-50%) rotate(90deg)",
          })}
      className={className}
      {...props}
    >
      <IoChevronForward />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  ProductCarousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
