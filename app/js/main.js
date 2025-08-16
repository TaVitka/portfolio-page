document.addEventListener('DOMContentLoaded', function(){
  //header

  const page = document.querySelector('body');
  const pageHeader = document.querySelector('.header');
  const pageFooter = document.querySelector('.footer');
  const pageOverlay = document.querySelector('.overlay');

  const startHeightValue = () => {
    let vh = window.innerHeight * 1;
    document.querySelector(':root').style.setProperty('--vh', `${vh}px`);

    const headerHeight = pageHeader ? pageHeader.offsetHeight : 0;
    const footerHeight = pageFooter ? pageFooter.offsetHeight : 0;

    document.documentElement.style.setProperty(
      '--header-height',
      `${headerHeight}px`,
    );

    document.documentElement.style.setProperty(
      '--footer-height',
      `${footerHeight}px`,
    );
  };

  window.addEventListener('resize', startHeightValue);
  window.addEventListener('scroll', startHeightValue);

  startHeightValue();

  let headerHeight = parseFloat(
    document.documentElement.style.getPropertyValue('--header-height')
  );

  let lastHeaderPosition;
  let newHeaderPosition;

  const hideHeaderOnScroll = () => {
    lastHeaderPosition = window.scrollY;
    addClassItem('.header', 'scroll');

    if (headerHeight - 50 < lastHeaderPosition && lastHeaderPosition > newHeaderPosition && newHeaderPosition !== 0) {
      addClassItem('.header', 'hide');
      addClassItem('.header', 'scroll');
      } else if ((newHeaderPosition > lastHeaderPosition) && lastHeaderPosition !== 0 || lastHeaderPosition < headerHeight) {
        removeClassItem('.header', 'hide');
      }

      if (lastHeaderPosition < headerHeight) removeClassItem('.header', 'scroll');

      newHeaderPosition = lastHeaderPosition;
  };

  const throttle = (callback, delay) => {
    let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();
        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }

    const throttleHideHeader = throttle(() => {
      hideHeaderOnScroll();
    }, 100);

    window.addEventListener('scroll', throttleHideHeader);
    throttleHideHeader();

    function addClassItem(selector, className) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add(className);
        });
    }

    function removeClassItem(selector, className) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.remove(className);
        });
    }

    const burgerBtn = document.querySelector('.menu__burger');
    const headerMenu = document.querySelector('.menu__list');

    if (window.matchMedia('(max-width: 787px)').matches) {
      burgerBtn.addEventListener('click', function(){
        this.classList.toggle('open');
        headerMenu.classList.toggle('open');
        pageOverlay.classList.toggle('active');
        page.classList.toggle('overflow');
      })

      headerMenu.addEventListener('click', (event) => {
        if (event.target.closest('a.menu__link')) {
          removeBurgerMenu();
        }
      });

      pageOverlay.addEventListener('click', (event) => {
        removeBurgerMenu(this);
      })

      function removeBurgerMenu (targetEl) {
        if (headerMenu.classList.contains('open')) {
        burgerBtn.classList.remove('open');
        headerMenu.classList.remove('open');
        pageOverlay.classList.remove('active');
        page.classList.remove('overflow');
        }
      }


    }

  //tabs with projects
  const tabsContainer = document.querySelector('.tabs');
  const tabsList = tabsContainer?.querySelector('.tabs__nav');
  const tabsButtons = tabsList?.querySelectorAll('.tabs__btn');
  const tabsPanels = tabsContainer?.querySelectorAll('.tabs__list .tabs__item');


  tabsButtons?.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');

    if (index === 0) {
      tab.classList.add('selected');
    }
  });

  tabsList?.addEventListener('click', e => {
    const clickedTab = e.target.closest('.tabs__btn');
    const allTabs = tabsList.querySelectorAll('.tabs__btn');

    tabsContainer.scrollIntoView({
      behavior : 'smooth'
    })

    if (!clickedTab) return;
    e.preventDefault();

    switchTab(clickedTab);

    allTabs.forEach(tab => {
      tab.classList.remove('selected');
    });

    clickedTab.classList.add('selected');
  });

  function switchTab(newTab) {
    const activePanelId = newTab.getAttribute('data-btn');

    if (activePanelId === 'all') {
      tabsPanels?.forEach(panel => {
        panel.removeAttribute('hidden');
      });
    } else {
      const activePanel = tabsContainer.querySelectorAll(`[data-id="${activePanelId}"`);

      tabsPanels?.forEach(panel => {
        panel.setAttribute('hidden', true);
      });

      activePanel.forEach(active => {
        active.removeAttribute('hidden', false);
      });
    }
  }
});