/// <reference types="cypress" />

describe('blog posts', () => {

    context('slug formatting', () => {
        it('contains one post from each year', () => {
            cy.visit('/2011/12/18/why-i-am-an-agnostic/');
            cy.visit('/2012/02/04/history/');
            cy.visit('/2013/09/01/recursive-copy-in-msbuild/');
            cy.visit('/2014/11/14/doctorows-three-laws/');
            cy.visit('/2015/06/18/secret-azure-debugging-tools/');
            cy.visit('/2016/09/23/balancing-ball-game-on-the-microbit/');
            cy.visit('/2017/08/21/blinking-cpp-for-the-microbit/');
            cy.visit('/2018/11/01/linting-in-powershell/');
            cy.visit('/2019/09/17/slowing-down-selenium-tests/');
            cy.visit('/2020/11/30/silent-night-for-the-microbit/');
            cy.visit('/2021/08/20/check-file-content-with-powershell/');
            cy.visit('/2022/09/30/improved-ghost-detector/');
            cy.visit('/2023/09/10/run-csharp-from-powershell/');
            cy.visit('/2024/03/28/make-a-jazz-noise-here/');
        });
    });


    // footer
    // powered by
    context('blog format', () => {

        beforeEach(() => {
            cy.visit('/2024/03/01/microbit-sound-meter/');
        });

        it('contains the correct title', () => {
            cy.get('h1.title')
            .should('has.text', 'Microbit Sound Meter');
        });

        it('contains the correct date', () => {
            cy.get('#article-meta')
            .should('contain', '01 March 2024');
        });

        it('contains the meta tags', () => {
            cy.get('#article-meta')
            .should('contain', 'code')
            .should('contain', 'microbit')
            .should('contain', 'python');
        });

        it('contains code sample', () => {
            cy.get('.language-python')
            .should('contain', 'from microbit import');
        });

        it('contains suggested posts', () => {
            cy.get('.related-posts')
            .should('contain', 'Other posts tagged with #code');
        });

        it('contains footer', () => {
            cy.get('.footer')
            .should('contain', 'Powered by');
        });

    });
});
  
