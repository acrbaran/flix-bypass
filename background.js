async function getCookie(cookieName, url) {
  try {
    const urlObj = new URL(url);
    const cookies = await chrome.cookies.getAll({
      name: cookieName,
      url: url
    });

    if (cookies.length > 0) {
      return cookies[0];
    }

    const allCookies = await chrome.cookies.getAll({
      domain: urlObj.hostname
    });

    const matchingCookie = allCookies.find(c => c.name === cookieName);
    return matchingCookie || null;
  } catch (error) {
    console.error('Cookie okuma hatası:', error);
    return null;
  }
}

async function setCookie(cookieDetails, newValue) {
  try {
    const cookieToSet = {
      url: cookieDetails.url,
      name: cookieDetails.name,
      value: newValue,
      domain: cookieDetails.domain,
      path: cookieDetails.path || '/',
      secure: cookieDetails.secure || false,
      httpOnly: cookieDetails.httpOnly || false,
      sameSite: cookieDetails.sameSite || 'no_restriction'
    };

    if (cookieDetails.expirationDate) {
      cookieToSet.expirationDate = cookieDetails.expirationDate;
    }

    await chrome.cookies.set(cookieToSet);
    return true;
  } catch (error) {
    console.error('Cookie ayarlama hatası:', error);
    return false;
  }
}

const tabOriginalCookies = new Map();

async function handleAutoMode(tabId, url) {
  const result = await chrome.storage.local.get(['autoMode', 'autoCookieName', 'autoNewValue']);

  if (!result.autoMode || !result.autoCookieName || !result.autoNewValue) {
    return;
  }

  const cookieName = result.autoCookieName;
  const newValue = result.autoNewValue;

  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    const hasWatch = pathname.includes('/watch');
    const hasBrowse = pathname.includes('/browse');

    if (!hasWatch && !hasBrowse) {
      return;
    }

    let waitTime = 3000;
    let urlType = '';

    if (hasWatch) {
      waitTime = 3000;
      urlType = 'watch';
    } else if (hasBrowse) {
      waitTime = 3000;
      urlType = 'browse';
    }


    let buttonFound = false;
    let buttonClassName = '';
    const maxAttempts = 20;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const buttonCheckResult = await chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => {
            let button = document.querySelector('button.ea2wixt2.default-ltr-yhcdbf-cache-1gb3zrv');

            if (!button) {
              button = document.querySelector('button.ea2wixt2') ||
                document.querySelector('button[class*="ea2wixt2"]') ||
                document.querySelector('button[class*="default-ltr-yhcdbf"]');
            }

            if (button) {
              return { found: true, className: button.className };
            }
            return { found: false };
          }
        });

        const buttonCheck = buttonCheckResult[0]?.result;

        if (buttonCheck?.found) {
          buttonFound = true;
          buttonClassName = buttonCheck.className;
          break;
        }

        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

      } catch (error) {
        console.error(`Button arama hatası (deneme ${attempt}):`, error);
      }
    }

    if (!buttonFound) {
      return;
    }


    const cookie = await getCookie(cookieName, url);

    if (!cookie) {
      return;
    }

    const originalValue = cookie.value;

    const fullCookie = { ...cookie, url };
    const changed = await setCookie(fullCookie, newValue);

    if (!changed) {
      return;
    }


    try {
      const clickResult = await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          let button = document.querySelector('button.ea2wixt2.default-ltr-yhcdbf-cache-1gb3zrv');

          if (!button) {
            button = document.querySelector('button.ea2wixt2') ||
              document.querySelector('button[class*="ea2wixt2"]') ||
              document.querySelector('button[class*="default-ltr-yhcdbf"]');
          }

          if (button) {
            button.click();
            button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            return { success: true };
          }
          return { success: false };
        }
      });

      const clickSuccess = clickResult[0]?.result?.success;
      if (clickSuccess) {
      } else {
      }

    } catch (clickError) {
      console.error('Button tıklama hatası:', clickError);
    }

    const waitSeconds = waitTime / 1000;
    await new Promise(resolve => setTimeout(resolve, waitTime));

    await setCookie(fullCookie, originalValue);

  } catch (error) {
    console.error('Otomatik mod hatası:', error);
  }
}

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId !== 0) {
    return;
  }

  await handleAutoMode(details.tabId, details.url);
});

chrome.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
  if (details.frameId !== 0) {
    return;
  }

  await handleAutoMode(details.tabId, details.url);
});

chrome.tabs.onRemoved.addListener((tabId) => {
  for (const key of tabOriginalCookies.keys()) {
    if (key.startsWith(`${tabId}_`)) {
      tabOriginalCookies.delete(key);
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
});

