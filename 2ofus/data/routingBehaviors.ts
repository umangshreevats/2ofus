// This file is used to determine in the application
// where to show the headers and footers with nav and footer elements and where not
// don't try to delete it or you would face deep consequences in the app
export const headerFooterMain = {
    "/": { show: true },
    "/profile": { show: false },
    "/home": { show: true },
    "/home/couple-setup": { show: false },
    "/home/my-couple/know-me/quiz": { show: false },
    "/home/profile": { show: false },
    "/home/my-couple/tell-and-get/history": { show: false }
}