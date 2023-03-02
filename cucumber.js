let common = [
    './test/features/**/*.feature',
    '--require-module ts-node/register',
    '--require ./test/steps/**/*.steps.ts',
    '--format progress-bar',
    '--format @cucumber/pretty-formatter',
    '--format-options \'{"colorsEnabled": true}\'',
    '--language pt', // Adicionando a opção para ler o idioma em português
    
    // '--dry-run'
].join(' ');

module.exports = {
    default: common,
};
