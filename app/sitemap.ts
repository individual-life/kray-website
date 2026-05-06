import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://kray-web.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://kray-web.com/login',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://kray-web.com/kray-todo',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        }
    ]
}