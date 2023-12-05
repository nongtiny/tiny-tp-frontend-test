import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { ContentSection } from './components/ContentSection';
import { ATHLETES_ITEMS, ATHLETES_HEADER_TEXT, ATHLETES_PREVIEW_IMG, ATHLETES_PLUS_DISPLAY_CONFIG, ATHLETES_LINE_DISPLAY_CONFIG } from './configs/athletes';
import { PLAYERS_ITEMS, PLAYERS_HEADER_TEXT, PLAYERS_PREVIEW_IMG, PLAYERS_PLUS_DISPLAY_CONFIG, PLAYERS_LINE_DISPLAY_CONFIG } from './configs/players';
import plusIcon from './assets/plus.png';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

function Plus({ className }) {
  return <img src={plusIcon} alt="plus-icon" width="15" height="15" className={"plus w-[15px] min-w-[15px] min-h-[15px] h-[15px] object-contain " + className} />;
}
function Line({ className }) {
  return <div className={"line " + className} />;
}

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const atheleteImageRef = useRef();
  const playerImageRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    //  ----- Window resize listener (Responsive handler) ------
    function handleWindowResize() {
      const isMobileDevice = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.substr(0, 4));
      if (isMobileDevice && window.innerWidth < 768) {
        setIsMobile(true);
      } else if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    //  ----- End of Window resize listener (Responsive handler) ------


    //  ----- Initial Loading Handler ------
    function handleLoaded() {
      const loadingScreen = document.getElementById('loading-screen');
      function onTransitionEnd( event ) {
        event.target.remove();
      }
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        loadingScreen.addEventListener('transitionend', onTransitionEnd );
      }

      gsap.fromTo(
        '#althleteImgId',
        {
          x: '-100%',
        },
        {
          x: 0,
          ease: 'power3.in'
        }
      ).then(() => {
        const scalar = 5;
        const ball = confetti.shapeFromText({ text: '🏈', scalar });
        confetti({
          shapes: [ball],
          scalar,
          angle: 120,
          spread: 180,
          origin: { x: 0, y: 0.5 },
        });
      });

      ScrollTrigger.create({
        trigger: "#playerImgId",
        start: "center bottom",
        onToggle: (self) => {
          gsap.fromTo(
            '#playerImgId',
            {
              x: '100%',
            },
            {
              x: 0,
              ease: 'power3.in'
            }
          ).then(() => {
            const scalar = 5;
            const ball = confetti.shapeFromText({ text: '🏀', scalar });
            confetti({
              shapes: [ball],
              scalar,
              angle: 120,
              spread: 180,
              origin: { x: 1, y: 0.7 },
            });
          });
          self.disable();
        },
      });
    }
    window.addEventListener('load', handleLoaded);
    //  ----- Wnd of Initial Loading Handler ------

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('load', handleLoaded);
    };
  }, []);


  return (
    <div className="content-wrapper overflow-hidden">
      <ContentSection
        key={'ATHLETES'}
        headerText={ATHLETES_HEADER_TEXT}
        items={ATHLETES_ITEMS}
        isMobile={isMobile}
        imageRef={atheleteImageRef}
        imageWrapperClass={
          "relative justify-self-center mt-[15px] h-[281px]"
            + " md:absolute md:h-[699px] md:left-[-148px] md:top-[64px]"
            + " lg:left-[5%] lg:top-[44px] lg:h-full lg:max-h-[950px] lg:w-[45%] lg:max-w-[672px]"
        }
        plusDisplayConfig={ATHLETES_PLUS_DISPLAY_CONFIG}
        lineDisplayConfig={ATHLETES_LINE_DISPLAY_CONFIG}
      >
        <div className="plus-group athelete-plus-group">
          <Plus className="absolute top-[12px] left-[-10px]" />
          <Plus className="absolute top-[20px] left-[10px]" />
        </div>
        <Line className="athelete-bg-line" />
        <picture
          id="althleteImgId"
          className="block relative w-auto h-full z-10 transform -translate-x-full"
        >
          <img
            ref={atheleteImageRef}
            src={ATHLETES_PREVIEW_IMG}
            className="relative w-auto h-full object-contain"
            alt="AmericanFootballMen"
            width="360"
            height="640"
          />
        </picture>
      </ContentSection>
      <ContentSection
        key={'PLAYERS'}
        headerText={PLAYERS_HEADER_TEXT}
        items={PLAYERS_ITEMS}
        imageRef={playerImageRef}
        isMobile={isMobile}
        imageWrapperClass={
          "relative justify-self-center mt-[15px] h-[235px]"
            + " md:absolute md:right-[-259px] md:top-[10px] md:h-[568px]"
            + " lg:top-0 lg:right-[5%] lg:h-full lg:max-h-[815px] lg:w-[65%] lg:max-w-[988px]"
        }
        plusDisplayConfig={PLAYERS_PLUS_DISPLAY_CONFIG}
        lineDisplayConfig={PLAYERS_LINE_DISPLAY_CONFIG}
      >
        <div className="plus-group player-plus-group-1">
          <Plus className="absolute top-[12px] left-[-10px]" />
          <Plus className="absolute top-[20px] left-[10px]" />
        </div>
        <div className="plus-group player-plus-group-2">
          <Plus className="absolute top-0 left-0" />
        </div>
        <Line className="player-bg-line-1 text-[#936EEA]" />
        <Line className="player-bg-line-2 text-[#936EEA]" />
        <picture
          id="playerImgId"
          className="block relative w-auto h-full z-10 transform translate-x-[200%]"
        >
          <img
            ref={playerImageRef}
            src={PLAYERS_PREVIEW_IMG}
            className="relative w-auto h-full object-contain"
            alt="BasketballMen"
            width="400"
            height="640"
          />
        </picture>
      </ContentSection>
    </div>
  );
}

Plus.propTypes = {
  className: PropTypes.any,
};
Line.propTypes = {
  className: PropTypes.any,
};

export default App;
