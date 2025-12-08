export type LocationInfo = {
    ip: string
    country: string
    countryCode: string
    region: string
    regionName: string
    city: string
    zip: string
    lat: number
    lon: number
    timezone: string
    isp: string
    org: string
    as: string
}


export const getIPAddress = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json')
        if (!response.ok) {
            throw new Error('Failed to fetch IP address')
        }
        const data = await response.json()
        return data.ip
    } catch (error) {
        console.error('Error fetching IP address:', error)
        return 'Unknown'
    }
}


export const getLocationFromIP = async (ip?: string): Promise<LocationInfo | null> => {
    try {
        const targetIP = ip || await getIPAddress()
        if (targetIP === 'Unknown') {
            throw new Error('Cannot get IP address')
        }
        const response = await fetch(`http://ip-api.com/json/${targetIP}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`)
        if (!response.ok) {
            throw new Error('Failed to fetch location data')
        }
        const data = await response.json()
        if (data.status === 'fail') {
            console.error('Location API error:', data.message)
            return null
        }

        return {
            ip: data.query,
            country: data.country,
            countryCode: data.countryCode,
            region: data.region,
            regionName: data.regionName,
            city: data.city,
            zip: data.zip,
            lat: data.lat,
            lon: data.lon,
            timezone: data.timezone,
            isp: data.isp,
            org: data.org,
            as: data.as
        }
    } catch (error) {
        console.error('Error fetching location from IP:', error)
        return null
    }
}


