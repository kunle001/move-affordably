import React from 'react';
import '../../public/css/Asection.css'

const Asection = () => {
  return (
    <div>
      <section className="TileContainer__column" data-selenium="tile-container-left">
        <div className="TileContainer__wrapper">
          <div className="WelcomeMessage WelcomeMessage--isFunnelTabsRedesign" data-selenium="hero-banner">
            <div className="WelcomeMessage__wrapper">
              <h1 className="" data-selenium="hero-banner-h1">See the world for less</h1>
              <h2 className="WelcomeMessage__H2" data-selenium="hero-banner-h2"></h2>
            </div>
          </div>
          <div className="Box-sc-kv6pi1-0 kZhKrh">
            <ul role="tablist" className="Box-sc-kv6pi1-0 MxzFS" style={{ zIndex: 998, position: 'relative' }}>
              <li id="tab-all-rooms-tab" role="tab" aria-selected="true" aria-controls="tabpanel-all-rooms-tab" data-element-name="all-rooms-tab" data-selenium="allRoomsTab" data-element-index="0" data-selected="true" className="Box-sc-kv6pi1-0 yueiq LinkComponent__Container">
                <div className="Box-sc-kv6pi1-0 gXKIsq LinkComponent__Label">
                  <div className="Box-sc-kv6pi1-0 jJvGxG">
                    <svg role="img" aria-hidden="true" className="sc-jSgupP sc-gKsewC laaIHh bcEbqx">
                      <use href="#HotelAccommodationFillIcon"></use>
                    </svg>
                    <h6 className="Typographystyled__TypographyStyled-sc-j18mtu-0 lcQfEu kite-js-Typography ">Hotels &amp; Homes</h6>
                  </div>
                  <div className="Box-sc-kv6pi1-0 lhFcYa LinkComponent__Underline"></div>
                </div>
              </li>
              <li id="tab-home" role="tab" aria-selected="false" aria-controls="tabpanel-home" data-element-name="home" data-selenium="homesTab" data-element-index="1" data-selected="false" className="Box-sc-kv6pi1-0 yueiq LinkComponent__Container">
                <div className="Box-sc-kv6pi1-0 iPYCUf LinkComponent__Label">
                  <div className="Box-sc-kv6pi1-0 jJvGxG">
                    <svg role="img" aria-hidden="true" className="sc-jSgupP sc-gKsewC laaIHh fRjkZh">
                      <use href="#HomeSymbolFillIcon"></use>
                    </svg>
                    <h6 className="Typographystyled__TypographyStyled-sc-j18mtu-0 lcQfEu kite-js-Typography ">Private stays</h6>
                  </div>
                </div>
              </li>
              <li id="tab-long-stay-tab" role="tab" aria-selected="false" aria-controls="tabpanel-long-stay-tab" data-element-name="long-stay-tab" data-selenium="longStayTab" data-element-index="2" data-selected="false" className="Box-sc-kv6pi1-0 yueiq LinkComponent__Container">
                <div className="Box-sc-kv6pi1-0 iPYCUf LinkComponent__Label">
                  <div className="Box-sc-kv6pi1-0 jJvGxG">
                    <svg role="img" aria-hidden="true" className="sc-jSgupP sc-gKsewC laaIHh gVBdUy">
                      <use href="#LongStayFillIcon"></use>
                    </svg>
                    <h6 className="Typographystyled__TypographyStyled-sc-j18mtu-0 lcQfEu kite-js-Typography ">Monthly stays</h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Asection;
