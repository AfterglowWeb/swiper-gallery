import { getBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

export default function getDefaultOptions (blockTypeName) {
    const typedDefaults = {};
    const blockType = getBlockType(blockTypeName);
    const defaultOptions = blockType.attributes.options.default;
        
    if (!defaultOptions) {
        return typedDefaults;
    }
    
    Object.keys(defaultOptions).forEach(key => {
        const optionDef = defaultOptions[key];
        
        if (optionDef && typeof optionDef.type !== 'undefined' && typeof optionDef.default !== 'undefined') {
            switch (optionDef.type) {
                case 'number':
                    typedDefaults[key] = Number(optionDef.default);
                    break;
                case 'boolean':
                    typedDefaults[key] = optionDef.default === 'false' ? false : Boolean(optionDef.default);
                    break;
                case 'string':
                    typedDefaults[key] = String(optionDef.default);
                    break;
                default:
                    typedDefaults[key] = optionDef.default;
            }
        } else {
            typedDefaults[key] = optionDef;
        }
    });
    
    return typedDefaults;
};