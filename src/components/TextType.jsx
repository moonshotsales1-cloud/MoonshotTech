'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback, isValidElement } from 'react';
import { gsap } from 'gsap';

const BR_TOKEN_REGEX = /<br\s*\/?\s*>/gi;

function normalizeTextInput(input) {
  if (input === null || input === undefined || typeof input === 'boolean') return '';
  if (typeof input === 'string') return input;
  if (typeof input === 'number') return String(input);
  if (Array.isArray(input)) return input.map(normalizeTextInput).join('');
  if (isValidElement(input)) {
    if (input.type === 'br') return '<br />';
    if (input.props?.children) return normalizeTextInput(input.props.children);
    return '';
  }
  try {
    return String(input);
  } catch (err) {
    return '';
  }
}

function buildTypingSequence(input, reverseMode) {
  const raw = normalizeTextInput(input);
  const parts = raw.split(BR_TOKEN_REGEX);
  const brCount = (raw.match(BR_TOKEN_REGEX) || []).length;

  const tokens = [];
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i]) tokens.push({ type: 'text', value: parts[i] });
    if (i < brCount) tokens.push({ type: 'br' });
  }

  if (reverseMode) {
    tokens.reverse();
    for (const t of tokens) {
      if (t.type === 'text') t.value = t.value.split('').reverse().join('');
    }
  }

  const seq = [];
  for (const t of tokens) {
    if (t.type === 'br') {
      seq.push('\n');
    } else {
      seq.push(...t.value.split(''));
    }
  }
  return seq;
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const typingSequence = useMemo(() => {
    const current = textArray[currentTextIndex] ?? '';
    return buildTypingSequence(current, reverseMode);
  }, [textArray, currentTextIndex, reverseMode]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return;
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;

    const currentText = textArray[currentTextIndex];
    const processedSequence = typingSequence;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedSequence.length) {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev + processedSequence[currentCharIndex]);
            setCurrentCharIndex(prev => prev + 1);
          }, variableSpeed ? getRandomSpeed() : typingSpeed);
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);

  const effectiveLength = typingSequence.length;
  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < effectiveLength || isDeleting);

  const renderedText = useMemo(() => {
    if (!displayedText.includes('\n')) return displayedText;
    const lines = displayedText.split('\n');
    return lines.flatMap((line, idx) =>
      idx < lines.length - 1 ? [line, <br key={`br-${idx}`} />] : [line]
    );
  }, [displayedText]);

  return createElement(Component, {
    ref: containerRef,
    className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
    ...props
  }, <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>
    {renderedText}
  </span>, showCursor && (
    <span
      ref={cursorRef}
      className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}>
      {cursorCharacter}
    </span>
  ));
};

export default TextType;
