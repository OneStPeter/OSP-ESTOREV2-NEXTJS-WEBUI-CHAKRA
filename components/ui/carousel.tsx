"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useRef, useId, useEffect } from "react";
import { Box, Flex, Button, Image } from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;
  const bg = useColorModeValue("#1D1F2F", "#1D1F2F");

  return (
    <Box perspective="1200px" transformStyle="preserve-3d">
      <Box
        as="li"
        ref={slideRef}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        textAlign="center"
        color="white"
        transition="all 0.3s ease-in-out"
        w="70vmin"
        h="70vmin"
        mx="4vmin"
        zIndex={10}
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bg={bg}
          borderRadius="1%"
          overflow="hidden"
          transition="all 0.15s ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <Image
            position="absolute"
            inset={0}
            w="120%"
            h="120%"
            objectFit="cover"
            opacity={current === index ? 1 : 0.5}
            transition="opacity 0.6s ease-in-out"
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <Box
              position="absolute"
              inset={0}
              bg="blackAlpha.200"
              transition="all 1s"
            />
          )}
        </Box>

        <Box
          as="article"
          position="relative"
          p="4vmin"
          transition="opacity 1s ease-in-out"
          opacity={current === index ? 1 : 0}
          visibility={current === index ? "visible" : "hidden"}
        >
          {/* <Heading size="lg" fontWeight="semibold" position="relative">
            {title}
          </Heading>
          <Center>
            <Button mt={6} px={4} py={2} colorScheme="whiteAlpha" color="black" h={12} borderRadius="2xl" shadow="md">
              {button}
            </Button>
          </Center> */}
        </Box>
      </Box>
    </Box>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  const bg = useColorModeValue("gray.200", "gray.800");
  const iconColor = useColorModeValue("gray.600", "gray.200");
  return (
    <Button
      w={10}
      h={10}
      display="flex"
      alignItems="center"
      mx={2}
      justifyContent="center"
      bg="blackAlpha.800"
      border="3px solid transparent"
      borderRadius="full"
      _focus={{ borderColor: "purple.400", outline: "none" }}
      _hover={{ transform: "translateY(-2px)" }}
      _active={{ transform: "translateY(2px)" }}
      title={title}
      onClick={handleClick}
      aria-label={title}
    >
      <FaArrowRight
        color={iconColor}
        style={
          type === "previous" ? { transform: "rotate(180deg)" } : undefined
        }
      />
    </Button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <Box
      position="relative"
      w="70vmin"
      h="80vmin"
      mx="auto"
      aria-labelledby={`carousel-heading-${id}`}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
    >
      <Box position="relative" w="full" h="70vmin">
        <Flex
          as="ul"
          position="absolute"
          mx="-4vmin"
          transition="transform 1s ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </Flex>
      </Box>
      <Flex justifyContent="center" w="full" mt={16} zIndex={20}>
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </Flex>
    </Box>
  );
}
