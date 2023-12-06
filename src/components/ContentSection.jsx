import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useAnimationFrame } from '../helpers/useAnimationFrame';
import { contentAreaControl } from '../configs/components/contentSection';

import Glide, { Controls, Breakpoints, Swipe } from '@glidejs/glide/dist/glide.modular.esm';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

import '../styles/content-section.css';

// Will add these custom style variables to the parent of the element to use with tailwindcss
const contentCustomStyleVars = {
  // grid-templates-columns
  '--columns-base-content-md': `repeat(${contentAreaControl.md.baseGridColumn}, minmax(0, 1fr))`,
  '--columns-base-content-lg': `repeat(${contentAreaControl.lg.baseGridColumn}, minmax(0, 1fr))`,
  // grid-column-* ...
  '--span-base-content-columns-md': `span ${contentAreaControl.md.baseGridColumn} / span ${contentAreaControl.md.baseGridColumn}`,
  '--span-content-columns-md': `span ${contentAreaControl.md.contentColumnSpan} / span ${contentAreaControl.md.contentColumnSpan}`,
  '--span-base-content-columns-lg': `span ${contentAreaControl.lg.baseGridColumn} / span ${contentAreaControl.lg.baseGridColumn}`,
  '--span-content-columns-lg': `span ${contentAreaControl.lg.contentColumnSpan} / span ${contentAreaControl.lg.contentColumnSpan}`,
  '--start-content-column-md': contentAreaControl.md.contentColumnStart,
  '--start-content-column-lg': contentAreaControl.lg.contentColumnStart,
};

export function ContentSection(props) {
  const {
    headerText,
    items,
    isMobile,
    children,
    imageRef,
    imageWrapperClass,
    plusDisplayConfig,
    lineDisplayConfig
  } = props;

  const glider = useRef();
  const glideElement = useRef();
  const isMouseIn = useRef(false);
  const mousePosition = useRef({
    x: 0,
    y: 0
  });

  useAnimationFrame(() => {
    handleMouseHoverImage();
  });

  const plusDisplayCustomStyle = useMemo(() => ({
    '--plus-display-sm': plusDisplayConfig.sm ? 'block' : 'none',
    '--plus-display-md': plusDisplayConfig.md ? 'block' : 'none',
    '--plus-display-lg': plusDisplayConfig.lg ? 'block' : 'none',
  }), [plusDisplayConfig]);
  const lineDisplayCustomStyle = useMemo(() => ({
    '--line-display-sm': lineDisplayConfig.sm ? 'block' : 'none',
    '--line-display-md': lineDisplayConfig.md ? 'block' : 'none',
    '--line-display-lg': lineDisplayConfig.lg ? 'block' : 'none',
  }), [lineDisplayConfig]);

  const handleOnGliderRun = useCallback(() => {
    if (!imageRef) {
      return;
    }

    const spinRightTimeLine = gsap.timeline({
      delay: 0
    });
    spinRightTimeLine.to(imageRef.current, { scaleX: '1', ease: 'sine.inOut' });
    spinRightTimeLine.to(imageRef.current, { scaleX: '-1', ease: 'sine.inOut' });
    spinRightTimeLine.to(imageRef.current, { scaleX: '1', ease: 'sine.inOut' });
    spinRightTimeLine.play();
  }, [imageRef]);
  const onMouseMove = useCallback((e) => {
    if (isMouseIn.current && imageRef && imageRef.current) {
      mousePosition.current = {
        x: e.x,
        y: e.y
      };
    }
  }, [imageRef]);

  useEffect(() => {
    if (!isMobile) {
      document.body.addEventListener('mousemove', onMouseMove);
      if (glider.current) {
        glider.current.destroy();
      }
      return () => {
        document.body.removeEventListener('mousemove', onMouseMove);
      };
    }

    document.body.removeEventListener('mousemove', onMouseMove);
    if (!glideElement.current) {
      return () => {
        document.body.removeEventListener('mousemove', onMouseMove);
      };
    }
    glider.current = new Glide(glideElement.current, {
      perView: 1,
      startAt: 0,
    });
    glider.current.on('run.before', handleOnGliderRun);
    glider.current.mount({ Controls, Breakpoints, Swipe });
  }, [isMobile, glider, onMouseMove, handleOnGliderRun]);

  useEffect(() => {
    if (imageRef && imageRef.current) {
      document.body.addEventListener('mousemove', onMouseMove);
    }
  }, [imageRef, onMouseMove]);

  function onMouseHover() {
    isMouseIn.current = true;
  }
  function onMouseOut() {
    isMouseIn.current = false;
  }
  function handleMouseHoverImage() {
    if (!imageRef) {
      return;
    }
    if (!imageRef.current || isMobile) {
      return;
    }

    if (isMouseIn.current) {
      gsap.to(imageRef.current, { x: mousePosition.current.y * 0.05, y: -mousePosition.current.x * 0.01});
      if (document.querySelector('.plus-group')) {
        gsap.to('.plus-group .plus', { x: -mousePosition.current.x * 0.01, y: mousePosition.current.y * 0.03});
      }
    } else {
      gsap.to(imageRef.current, { x: 0, y: 0 });
      if (document.querySelector('.plus-group')) {
        gsap.to('.plus-group .plus', { x: 0, y: 0 });
      }
    }
  }

  return <section
    className={
      "group content-section relative pt-[20px]"
      + " md:pt-[50px]"
      + " lg:pt-[100px]"
    }
  >
    {
      isMobile
        ? <div className="base-container">
          <h3
            className={
              "text-[#E7E7E7] text-[50px] leading-[58.59px]"
              + " md:text-[90px] md:leading-[105.47px]"
            }
          >
            { headerText.toUpperCase() }
          </h3>
        </div>
        : <></>
    }
    <div
      className={
        "grid grid-cols-1 items-center"
        + " md:grid-cols-columns-base-content-md md:items-start"
        + " lg:grid-cols-columns-base-content-lg"
      }
      style={{
        ...contentCustomStyleVars,
        ...plusDisplayCustomStyle,
        ...lineDisplayCustomStyle
      }}
    >
      <div className={imageWrapperClass}>
        <div
          onMouseOver={onMouseHover}
          onMouseLeave={onMouseOut}
          className="relative h-full"
        >
          { children }
        </div>
      </div>
      {
        isMobile
          ? <div className="pt-[60px] pb-[25px] bg-[#F5F4F9] mt-[-26px]">
            <div className="base-container">
              <div
                ref={glideElement}
                className="glide"
              >
                <div
                  className="glide__track"
                  data-glide-el="track"
                >
                  <ul className="glide__slides pb-[30px]">
                    {
                      items.map((item, index) =>
                        <li
                          key={'sectionMobileSlideItem' + index}
                          className="w-full glide__slide"
                        >
                          <p className="relative flex items-center gap-[10px]">
                            <span
                              className={
                                "inline-block relative top-[-3px] text-[14px]"
                                + " before:absolute before:bottom-[-2px] before:w-full before:h-[4px] before:rounded-full before:bg-[#603EBE]"
                              }
                            >
                              { `0${index + 1}`}
                            </span>
                            <span className="text-[28px] leading-[32.81px] tracking-[1.5px] text-[#C2C2C2]">
                              { item.title }
                            </span>
                          </p>
                          <p className="text-[15px] mt-[10px] leading-[17.58px]">
                            { item.description }
                          </p>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div
                  className="glide__bullets"
                  data-glide-el="controls[nav]"
                >
                  {
                    items.map((item, index) =>
                      <button
                        key={`glide__bullet${index}`}
                        aria-label={`slider_bullet_${index}`}
                        aria-labelledby={`glider_bullet_${index}`}
                        data-glide-dir={`=${index}`}
                        className="glide__bullet"
                        role="button"
                      />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          : <div
            className={
              "col-span-base-content-columns-md"
              + " lg:col-span-base-content-columns-lg"
            }
          >
            <div className="base-container">
              <div
                className={
                  "grid grid-cols-columns-base-content-md"
                  + " lg:grid-cols-columns-base-content-lg"
                }
              >
                <div
                  className={
                    "group-[.content-section:nth-child(even)]:col-start-1 col-start-content-column-md col-span-content-columns-md"
                    + " lg:col-start-content-column-lg lg:col-span-content-columns-lg"
                  }
                >
                  <h3 className="text-[#E7E7E7] text-[90px] leading-[105.47px]">
                    { headerText.toUpperCase() }
                  </h3>
                </div>
              </div>
            </div>

            <ul
              className={
                "mt-[15px]"
                + " lg:mt-[10px]"
              }
            >
              {
                items.map((item, index) =>
                  <li
                    key={'sectionItem'+index}
                    className={
                      "w-full py-[30px] group section-item"
                      + " lg:py-[60px]"
                    }
                    style={{
                      backgroundColor: item.bgColor
                    }}
                  >
                    <div
                      className={
                        "base-container grid grid-cols-columns-base-content-md"
                        + " lg:grid-cols-columns-base-content-lg"
                      }
                    >
                      <div
                        className={
                          "group-[.content-section:nth-child(even)]:col-start-1 col-start-content-column-md col-span-content-columns-md"
                          + " lg:col-start-content-column-lg lg:col-span-content-columns-lg"
                        }
                      >
                        <p className="relative flex items-center gap-[10px]">
                          <span
                            className={
                              "inline-block relative top-[-3px] text-[18px] tracking-[1.5px]"
                              + " before:absolute before:bottom-[-2px] before:w-full before:h-[4px] before:rounded-full before:bg-[#603EBE]"
                              + " group-[.section-item:last-child]:before:bg-white"
                            }
                            style={{
                              color: item.numberColor
                            }}
                          >
                            { `0${index + 1}`}
                          </span>
                          <span className="text-[36px] leading-[42.19px] tracking-[1.5px] text-[#C2C2C2]">
                            { item.title }
                          </span>
                        </p>
                        <p
                          className={
                            "text-[18px] mt-[20px] leading-[28px]"
                            + " group-[.section-item:last-child]:text-white"
                          }
                        >
                          { item.description }
                        </p>
                      </div>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
      }
    </div>
  </section>;
}

ContentSection.propTypes = {
  headerText: PropTypes.string,
  items: PropTypes.array,
  isMobile: PropTypes.bool,
  children: PropTypes.any,
  imageRef: PropTypes.any,
  imageWrapperClass: PropTypes.any,
  plusDisplayConfig: PropTypes.any,
  lineDisplayConfig: PropTypes.any,
};
