import { LocationInfo, getLocationFromIP } from "../services/ip-address"

export type BrowserInfo = {
    browser: string
    browserVersion: string
    os: string
    deviceType: string
    userAgent: string
    screenResolution: string
    language: string
    platform: string
    location?: LocationInfo | string
}

export const getInformationBrowser = async (): Promise<BrowserInfo> => {
    const userAgent = navigator.userAgent
    let browserName = 'Unknown'
    let browserVersion = 'Unknown'

    if (userAgent.indexOf("Edg") !== -1) {
        browserName = "Microsoft Edge"
        const match = userAgent.match(/Edg\/([0-9.]+)/)
        if (match) browserVersion = match[1]
    } else if (userAgent.indexOf("OPR") !== -1 || userAgent.indexOf("Opera") !== -1) {
        browserName = "Opera"
        const match = userAgent.match(/(?:OPR|Opera)\/([0-9.]+)/)
        if (match) browserVersion = match[1]
    } else if (userAgent.indexOf("Chrome") !== -1) {
        browserName = "Google Chrome"
        const match = userAgent.match(/Chrome\/([0-9.]+)/)
        if (match) browserVersion = match[1]
    } else if (userAgent.indexOf("Firefox") !== -1) {
        browserName = "Mozilla Firefox"
        const match = userAgent.match(/Firefox\/([0-9.]+)/)
        if (match) browserVersion = match[1]
    } else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1) {
        browserName = "Safari"
        const match = userAgent.match(/Version\/([0-9.]+)/)
        if (match) browserVersion = match[1]
    }

    let os = 'Unknown'
    if (userAgent.indexOf('Windows NT 10.0') !== -1) os = 'Windows 10'
    else if (userAgent.indexOf('Windows NT 11.0') !== -1) os = 'Windows 11'
    else if (userAgent.indexOf('Windows NT 6.3') !== -1) os = 'Windows 8.1'
    else if (userAgent.indexOf('Windows NT 6.2') !== -1) os = 'Windows 8'
    else if (userAgent.indexOf('Windows NT 6.1') !== -1) os = 'Windows 7'
    else if (userAgent.indexOf('Windows') !== -1) os = 'Windows'
    else if (userAgent.indexOf('Mac OS X') !== -1) {
        const match = userAgent.match(/Mac OS X ([0-9_]+)/)
        os = match ? `MacOS ${match[1].replace(/_/g, '.')}` : 'MacOS'
    } else if (userAgent.indexOf('Linux') !== -1) os = 'Linux'
    else if (userAgent.indexOf('Android') !== -1) {
        const match = userAgent.match(/Android ([0-9.]+)/)
        os = match ? `Android ${match[1]}` : 'Android'
    } else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) {
        const match = userAgent.match(/OS ([0-9_]+)/)
        os = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS'
    }

    let deviceType = 'Desktop'
    if (/iPad/.test(userAgent)) {
        deviceType = 'Tablet'
    } else if (/Mobile|Android|iPhone|iPod/.test(userAgent)) {
        deviceType = 'Mobile'
    }

    const screenResolution = `${window.screen.width}x${window.screen.height}`

    const language = navigator.language || 'Unknown'

    const platform = navigator.platform || 'Unknown'

    const location = await getLocationFromIP() || 'Unknown'

    return {
        browser: browserName,
        browserVersion,
        os,
        deviceType,
        userAgent,
        screenResolution,
        language,
        platform,
        location
    }
}






