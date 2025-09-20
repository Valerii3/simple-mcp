export function loadConfig() {
    const port = parseInt(process.env.PORT || '8080', 10);
    const isProduction = process.env.NODE_ENV === 'production';
    return { port, isProduction };
}
//# sourceMappingURL=config.js.map