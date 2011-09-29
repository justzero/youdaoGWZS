(function($) {

    $.conf = {
        'init': [],
        'initGouwuContainer': [],
        '110011': ['searchMin', 'douban',  'conf', 'taobao', 'morePrice','priceData', 'resize'],
        '110000': ['searchMax','conf'],
        '111100': ['searchMin', 'sameType', 'conf' ,'taobao','morePrice',  'resize'],
        features: ['sameType'],
        featuresCode:'0',
        action: {
            '110011': [],
            '110000': [],
            '111100': []
        },
        info: {
            'priceData' : [],
            'douban' : [],
            'sameType' : []
        }
    };
    
})(youdao);
