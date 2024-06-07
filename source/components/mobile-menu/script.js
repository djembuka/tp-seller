window.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('toggleTwpxMobileMenu')
    .addEventListener('click', (e) => {
      e.preventDefault();
      $('.twpx-mobile-menu__block').slideToggle();
      $('.twpx-mobile-menu-sub:visible').slideUp();
      document
        .querySelectorAll('.twpx-mobile-menu__item.active')
        .forEach((item) => {
          item.classList.remove('active');
        });
    });

  class TwpxMobileMenu {
    constructor(elem) {
      this.elem = elem;
      this.fetchMobileMenuFlag;
      window.addEventListener('resize', () => {
        this.fetchMobileMenu();
      });
      this.fetchMobileMenu();
    }

    fetchMobileMenu() {
      if (
        window.matchMedia('(max-width: 1024px)').matches &&
        !this.fetchMobileMenuFlag
      ) {
        this.fetchMobileMenuFlag = true;
        (async () => {
          try {
            const response = await fetch(this.elem.getAttribute('data-url'));
            const result = await response.text();
            const twpxMobileMenuTitleElem = this.elem.querySelector(
              '.twpx-mobile-menu__title'
            );
            const mobileMenu = document.createElement('div');
            mobileMenu.innerHTML = result;

            if (twpxMobileMenuTitleElem) {
              twpxMobileMenuTitleElem.after(mobileMenu);
              //events
              mobileMenu
                .querySelectorAll('.twpx-mobile-menu__link')
                .forEach((menuLink) => {
                  menuLink.addEventListener('click', (e) => {
                    if (menuLink.classList.contains('i-link')) {
                      return;
                    }
                    e.preventDefault();

                    if (
                      !menuLink
                        .closest('.twpx-mobile-menu__item')
                        .classList.contains('active')
                    ) {
                      //slide up
                      mobileMenu
                        .querySelectorAll('.twpx-mobile-menu__item.active')
                        .forEach((menuItem) => {
                          menuItem.classList.remove('active');
                        });
                      $('.twpx-mobile-menu-sub:visible').slideUp();
                    }

                    //show current
                    menuLink
                      .closest('.twpx-mobile-menu__item')
                      .classList.toggle('active');
                    $(
                      menuLink.parentNode.querySelector('.twpx-mobile-menu-sub')
                    ).slideToggle();
                  });
                });
            }
          } catch (err) {
            throw err;
          }
        })();
      }
    }
  }

  new TwpxMobileMenu(document.getElementById('twpxMobileMenu'));
});
