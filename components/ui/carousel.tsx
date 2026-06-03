"use client";

import { useState, useRef, useId, useEffect } from "react";
import { Box, Flex, Button, Image, IconButton } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
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
  isMobile: boolean;
  handleSlideClick: (index: number) => void;
}

const Slide = ({
  slide,
  index,
  current,
  isMobile,
  handleSlideClick,
}: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      if (!slideRef.current) return;

      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isMobile]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMobile) return;

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

  const { src, title } = slide;
  const bg = useColorModeValue("transparent", "transparent");

  return (
    <Box
      perspective={{ base: "none", md: "1200px" }}
      transformStyle={{ base: "flat", md: "preserve-3d" }}
      w={{ base: "100%", md: "auto" }}
      flexShrink={0}
    >
      <Box
        as="div"
        ref={slideRef}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        textAlign="center"
        color="white"
        transition="all 0.3s ease-in-out"
        w={{ base: "100%", md: "70vmin" }}
        h={{ base: "320px", sm: "380px", md: "70vmin" }}
        mx={{ base: 0, md: "4vmin" }}
        zIndex={10}
        listStyleType="none"
        cursor="pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            !isMobile && current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <Box
          position="absolute"
          inset={0}
          w="full"
          h="full"
          bg={bg}
          borderRadius={{ base: "2xl", md: "3xl" }}
          overflow="hidden"
          transition="all 0.15s ease-out"
          style={{
            transform:
              !isMobile && current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <Image
            position="absolute"
            inset={0}
            w="100%"
            h="100%"
            objectFit="cover"
            opacity={isMobile || current === index ? 1 : 0.5}
            transition="opacity 0.6s ease-in-out"
            alt={title}
            src={src}
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
      </Box>
    </Box>
  );
};

interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => (
  <Button
    w="30px"
    h="30px"
    minW="30px"
    display="flex"
    alignItems="center"
    mx={2}
    zIndex={20}
    justifyContent="center"
    bg={type === "previous" ? "#E4F7EC" : "white"}
    borderWidth="1px"
    borderColor={type === "previous" ? "#BFE9D0" : "#159B50"}
    borderRadius="full"
    color="#159B50"
    _focus={{ borderColor: "#159B50", outline: "none" }}
    _hover={{ bg: type === "previous" ? "#D5F2E2" : "green.50" }}
    _active={{ bg: type === "previous" ? "#C8ECD8" : "green.100" }}
    title={title}
    onClick={handleClick}
    aria-label={title}
  >
    {type === "previous" ? (
      <FiArrowLeft size={20} />
    ) : (
      <FiArrowRight size={20} />
    )}
  </Button>
);

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const slideWidth = container.offsetWidth;

    container.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });

    setCurrent(index);
  };

  const handlePreviousClick = () => {
    const previous = current - 1 < 0 ? slides.length - 1 : current - 1;

    if (isMobile) {
      scrollToSlide(previous);
      return;
    }

    setCurrent(previous);
  };

  const handleNextClick = () => {
    const next = current + 1 === slides.length ? 0 : current + 1;

    if (isMobile) {
      scrollToSlide(next);
      return;
    }

    setCurrent(next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);

      if (isMobile) {
        scrollToSlide(index);
      }
    }
  };

  const handleScroll = () => {
    if (!containerRef.current || !isMobile) return;

    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);

    if (index !== current && index >= 0 && index < slides.length) {
      setCurrent(index);
    }
  };

  return (
    <Box
      position="relative"
      w="full"
      h={{ base: "320px", sm: "380px", md: "80vmin" }}
      mx="auto"
      aria-labelledby={`carousel-heading-${id}`}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="transparent"
    >
      <Box
        ref={containerRef}
        position="relative"
        w="full"
        h={{ base: "320px", sm: "380px", md: "70vmin" }}
        overflowX={{ base: "auto", md: "hidden" }}
        overflowY="hidden"
        scrollSnapType={{ base: "x mandatory", md: "none" }}
        scrollBehavior="smooth"
        onScroll={handleScroll}
        bg="transparent"
        css={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Flex
          as="ul"
          position={{ base: "relative", md: "absolute" }}
          top={0}
          left={0}
          h="full"
          w={{ base: `${slides.length * 100}%`, md: "auto" }}
          p={0}
          m={0}
          transition={{ base: "none", md: "transform 1s ease-in-out" }}
          style={
            isMobile
              ? undefined
              : {
                  transform: `translateX(-${current * (100 / slides.length)}%)`,
                }
          }
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              as="li"
              listStyleType="none"
              flex={{
                base: `0 0 ${100 / slides.length}%`,
                md: "0 0 auto",
              }}
              w={{ base: `${100 / slides.length}%`, md: "auto" }}
              h="full"
              scrollSnapAlign={{ base: "center", md: "none" }}
            >
              <Slide
                slide={slide}
                index={index}
                current={current}
                isMobile={isMobile}
                handleSlideClick={handleSlideClick}
              />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Mobile green buttons */}
      <IconButton
        aria-label="Go to previous slide"
        display={{ base: "flex", md: "none" }}
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={20}
        w="30px"
        h="30px"
        minW="30px"
        borderRadius="full"
        bg="#E4F7EC"
        color="#159B50"
        borderWidth="1px"
        borderColor="#BFE9D0"
        _hover={{
          bg: "#D5F2E2",
          transform: "translateY(-50%)",
        }}
        _active={{ bg: "#C8ECD8" }}
        onClick={handlePreviousClick}
      >
        <FiArrowLeft size={20} />
      </IconButton>

      <IconButton
        aria-label="Go to next slide"
        display={{ base: "flex", md: "none" }}
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={20}
        w="30px"
        h="30px"
        minW="30px"
        borderRadius="full"
        bg="white"
        color="#159B50"
        borderWidth="1px"
        borderColor="#159B50"
        _hover={{
          bg: "green.50",
          transform: "translateY(-50%)",
        }}
        _active={{ bg: "green.100" }}
        onClick={handleNextClick}
      >
        <FiArrowRight size={20} />
      </IconButton>

      {/* Desktop controls */}
      <Flex
        display={{ base: "none", md: "flex" }}
        justifyContent="center"
        w="100%"
        mt={10}
        zIndex={20}
      >
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
