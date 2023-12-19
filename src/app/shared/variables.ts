import { Network } from "alchemy-sdk"
import { ChainInfo } from "./blockchain/blockchain.service"

export class RPC {
    static ethRPC   = 'https://flashy-few-wildflower.quiknode.pro/8d0390009c7d0b39934822aafc232dcba3cc5eb6/'
    static maticRPC = 'https://divine-thrilling-arrow.matic.quiknode.pro/456d54971974476410189538264c1a6c2936275d/'
    static opRPC    = 'https://greatest-patient-theorem.optimism.quiknode.pro/033a0ab3a08bbf0b2d83e1cf2ac5fb004a373c53/'
    static arbRPC   = 'https://floral-proportionate-paper.arbitrum-mainnet.quiknode.pro/fb6d3584e044ee7c71eb732817db9d6c7f91d1a5/'
    static baseRPC  = 'https://black-polished-night.base-mainnet.quiknode.pro/e089b7987608d1af26dbf67a4d909035922eeef1/'
    static bscRPC   = 'https://polished-crimson-sanctuary.bsc.quiknode.pro/7456bebd296ddb17a0844b9b13ba16da14a38a64/'
    static avaxRPC  = 'https://floral-tame-star.avalanche-mainnet.quiknode.pro/383add3484076327e01fa6d3ecec463d8f9ab55b/ext/bc/C/rpc/'
}

export class ChainSelectors {
    static ETH      = "5009297550715157269"
    static OP       = "3734403246176062136"
    static MATIC    = "4051577828743386545"
    static AVAX     = "6433500567565415381"
    static ARB      = "4949039107694359620"
    static BNB      = "11344663589394136015"
    static BASE     = "15971525489660198786"
    static SEPETH   = '16015286601757825753'
    static OPGOERLI = '2664363617261496610'
}

export class Chains {
    static prod: ChainInfo[] = [
        {
          id: 1,
          token: 'ETH',
          label: 'Ethereum',
          rpcUrl: RPC.ethRPC!,
          logoUri: 'ethereum.svg',
          selector: ChainSelectors.ETH,
          network: Network.ETH_MAINNET,
          shortName: 'ETH'
        },
        {
          id: 137,
          token: 'MATIC',
          label: 'Polygon',
          rpcUrl: RPC.maticRPC!,
          logoUri: 'matic.svg',
          selector: ChainSelectors.MATIC,
          network: Network.MATIC_MAINNET,
          shortName: 'MATIC'
        },
        {
          id: 42161,
          token: 'ETH',
          label: 'Arbitrum',
          rpcUrl: RPC.arbRPC!,
          logoUri: 'arbitrum.svg',
          selector: ChainSelectors.ARB,
          network: Network.ARB_MAINNET,
          shortName: 'ARB'
        },
        {
          id: 10,
          token: 'ETH',
          label: 'Optimism',
          rpcUrl: RPC.opRPC!,
          logoUri: 'optimism.svg',
          selector: ChainSelectors.OP,
          network: Network.OPT_MAINNET,
          shortName: 'OP'
        },
        {
          id: 8453,
          token: 'ETH',
          label: 'Base',
          rpcUrl: RPC.baseRPC!,
          logoUri: 'base.svg',
          selector: ChainSelectors.BASE,
          network: Network.BASE_MAINNET,
          shortName: 'BASE'
        }
      ]
}

export class CCIPLanes {
    static lanes: Record<number, number[]> = {
      1: [137, 42161, 10, 8453],
      8453: [1, 42161, 10],
      42161: [1],
      10: [1, 137],
      137: [1, 10]
    }
}

export class ErrorMessages {
  static clipboardError = "Safe security policy prevents writing to clipboard on certain browsers. Please copy the address manually"
}

export const logoSvg = `<svg width="4047" height="868" viewBox="0 0 4047 868" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_60_43)">
<rect x="761.667" y="64.8032" width="882.371" height="80" rx="40" transform="rotate(144.1 761.667 64.8032)" fill="url(#paint0_linear_60_43)"/>
</g>
<g filter="url(#filter1_d_60_43)">
<rect x="260.365" y="7.87817" width="865.666" height="80" rx="40" transform="rotate(72.07 260.365 7.87817)" fill="url(#paint1_linear_60_43)"/>
</g>
<rect x="23" y="481" width="884" height="80" rx="40" fill="url(#paint2_linear_60_43)"/>
<g filter="url(#filter2_d_60_43)">
<rect x="761.667" y="64.8032" width="882.371" height="80" rx="40" transform="rotate(144.1 761.667 64.8032)" fill="url(#paint3_linear_60_43)"/>
</g>
<g filter="url(#filter3_d_60_43)">
<rect x="260.365" y="7.87817" width="865.666" height="80" rx="40" transform="rotate(72.07 260.365 7.87817)" fill="url(#paint4_linear_60_43)"/>
</g>
<rect x="23" y="481" width="884" height="80" rx="40" fill="url(#paint5_linear_60_43)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M101.579 513.131L241.363 82.9182H688.723L828.782 513.975L465.761 777.725L101.579 513.131ZM490.329 858.76C476.627 869.425 457.01 870.252 442.259 859.535L34.8524 563.537C31.1404 560.84 28.0285 557.624 25.5439 554.061C16.1197 543.778 12.3527 528.854 16.9705 514.642L172.216 36.8443C172.623 35.5922 173.086 34.3738 173.601 33.1911C177.946 15.8005 193.673 2.91821 212.41 2.91821H717.41C732.04 2.91821 744.836 10.7725 751.81 22.4944C753.647 25.3414 755.149 28.4702 756.245 31.8443L912.667 513.261C913.585 516.086 914.171 518.939 914.448 521.778C917.429 536.633 911.797 552.546 898.737 562.035L490.329 858.76Z" fill="url(#paint6_linear_60_43)"/>
<path d="M1489.55 603.802C1486.32 603.802 1483.29 602.24 1481.41 599.609L1355.99 423.794C1354.12 421.164 1351.08 419.602 1347.85 419.602H1313.2C1307.68 419.602 1303.2 424.079 1303.2 429.602V593.802C1303.2 599.325 1298.73 603.802 1293.2 603.802H1244.8C1239.28 603.802 1234.8 599.325 1234.8 593.802V193.802C1234.8 188.279 1239.28 183.802 1244.8 183.802H1293.2C1298.73 183.802 1303.2 188.279 1303.2 193.802V345.402C1303.2 350.925 1307.68 355.402 1313.2 355.402H1347.18C1350.45 355.402 1353.52 353.8 1355.39 351.113L1468.82 188.09C1470.69 185.404 1473.75 183.802 1477.03 183.802H1537.64C1545.76 183.802 1550.49 192.97 1545.79 199.591L1417.15 380.757C1414.67 384.251 1414.69 388.938 1417.21 392.409L1558.72 587.939C1563.51 594.551 1558.78 603.802 1550.62 603.802H1489.55Z" fill="url(#paint7_linear_60_43)"/>
<path d="M1749.92 529.602C1749.92 535.125 1754.4 539.602 1759.92 539.602H1914.52C1920.04 539.602 1924.52 544.079 1924.52 549.602V593.802C1924.52 599.325 1920.04 603.802 1914.52 603.802H1691.52C1686 603.802 1681.52 599.325 1681.52 593.802V193.802C1681.52 188.279 1686 183.802 1691.52 183.802H1739.92C1745.44 183.802 1749.92 188.279 1749.92 193.802V529.602Z" fill="url(#paint8_linear_60_43)"/>
<path d="M2344.5 603.802C2340.39 603.802 2336.71 601.292 2335.2 597.473L2304.19 518.93C2302.69 515.111 2299 512.602 2294.89 512.602H2120.74C2116.62 512.602 2112.91 515.136 2111.42 518.983L2080.97 597.42C2079.48 601.267 2075.78 603.802 2071.65 603.802H2020.09C2013.01 603.802 2008.17 596.647 2010.81 590.076L2171.38 190.076C2172.9 186.286 2176.57 183.802 2180.66 183.802H2232.02C2236.06 183.802 2239.71 186.238 2241.25 189.974L2406.97 589.974C2409.7 596.559 2404.86 603.802 2397.73 603.802H2344.5ZM2216.83 297.34C2213.49 288.909 2201.55 288.927 2198.23 297.367L2143.27 437.142C2140.69 443.703 2145.52 450.802 2152.57 450.802H2262.97C2270.03 450.802 2274.87 443.68 2272.27 437.115L2216.83 297.34Z" fill="url(#paint9_linear_60_43)"/>
<path d="M2649.51 610.402C2559.03 610.402 2496.23 561.691 2491.41 481.814C2491.07 476.301 2495.59 471.802 2501.11 471.802H2551.31C2556.83 471.802 2561.23 476.309 2561.92 481.788C2567.01 522.34 2603.33 545.002 2648.91 545.002C2693.91 545.002 2731.71 521.002 2731.71 482.602C2731.71 440.602 2686.71 430.402 2636.31 418.402C2572.11 402.802 2498.31 384.802 2498.31 298.402C2498.31 222.802 2555.91 177.802 2645.31 177.802C2732.6 177.802 2785.82 223.427 2790.21 296.788C2790.54 302.301 2786.03 306.802 2780.51 306.802H2732.11C2726.59 306.802 2722.2 302.29 2721.42 296.823C2716.32 261.203 2683.7 242.002 2643.51 242.002C2601.51 242.002 2567.31 261.202 2567.31 295.402C2567.31 334.402 2610.51 344.602 2660.31 356.602C2725.71 372.802 2802.51 391.402 2802.51 482.002C2802.51 566.002 2734.71 610.402 2649.51 610.402Z" fill="url(#paint10_linear_60_43)"/>
<path d="M3199.74 183.802C3205.27 183.802 3209.74 188.279 3209.74 193.802V238.602C3209.74 244.125 3205.27 248.602 3199.74 248.602H3096.74C3091.22 248.602 3086.74 253.079 3086.74 258.602V593.802C3086.74 599.325 3082.27 603.802 3076.74 603.802H3027.74C3022.22 603.802 3017.74 599.325 3017.74 593.802V258.602C3017.74 253.079 3013.27 248.602 3007.74 248.602H2904.74C2899.22 248.602 2894.74 244.125 2894.74 238.602V193.802C2894.74 188.279 2899.22 183.802 2904.74 183.802H3199.74Z" fill="url(#paint11_linear_60_43)"/>
<path d="M3404.96 529.002C3404.96 534.525 3409.44 539.002 3414.96 539.002H3576.76C3582.28 539.002 3586.76 543.479 3586.76 549.002V593.802C3586.76 599.325 3582.28 603.802 3576.76 603.802H3346.56C3341.04 603.802 3336.56 599.325 3336.56 593.802V193.802C3336.56 188.279 3341.04 183.802 3346.56 183.802H3570.16C3575.68 183.802 3580.16 188.279 3580.16 193.802V238.602C3580.16 244.125 3575.68 248.602 3570.16 248.602H3414.96C3409.44 248.602 3404.96 253.079 3404.96 258.602V348.402C3404.96 353.925 3409.44 358.402 3414.96 358.402H3554.56C3560.08 358.402 3564.56 362.879 3564.56 368.402V411.402C3564.56 416.925 3560.08 421.402 3554.56 421.402H3414.96C3409.44 421.402 3404.96 425.879 3404.96 431.402V529.002Z" fill="url(#paint12_linear_60_43)"/>
<path d="M3974.5 603.802C3970.95 603.802 3967.66 601.912 3965.87 598.838L3881.05 453.365C3879.26 450.292 3875.97 448.402 3872.41 448.402H3808.36C3802.84 448.402 3798.36 452.879 3798.36 458.402V593.802C3798.36 599.325 3793.88 603.802 3788.36 603.802H3739.96C3734.44 603.802 3729.96 599.325 3729.96 593.802V193.802C3729.96 188.279 3734.44 183.802 3739.96 183.802H3893.16C3974.16 183.802 4034.16 239.602 4034.16 317.002C4034.16 369.82 4004.79 412.85 3959.91 434.156C3954.3 436.818 3951.84 443.698 3954.99 449.047L4037.28 588.726C4041.21 595.392 4036.4 603.802 4028.66 603.802H3974.5ZM3808.36 248.602C3802.84 248.602 3798.36 253.079 3798.36 258.602V374.202C3798.36 379.725 3802.84 384.202 3808.36 384.202H3888.96C3934.56 384.202 3963.96 356.002 3963.96 316.402C3963.96 277.402 3934.56 248.602 3888.96 248.602H3808.36Z" fill="url(#paint13_linear_60_43)"/>
<defs>
<filter id="filter0_d_60_43" x="11.8535" y="15.8535" width="737.96" height="558.494" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_43"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_43" result="shape"/>
</filter>
<filter id="filter1_d_60_43" x="190.611" y="18.239" width="329.893" height="835.53" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_43"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_43" result="shape"/>
</filter>
<filter id="filter2_d_60_43" x="11.8535" y="15.8535" width="737.96" height="558.494" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_43"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_43" result="shape"/>
</filter>
<filter id="filter3_d_60_43" x="190.611" y="18.239" width="329.893" height="835.53" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_43"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_43" result="shape"/>
</filter>
<linearGradient id="paint0_linear_60_43" x1="797.84" y1="107.629" x2="1600.5" y2="106.98" gradientUnits="userSpaceOnUse">
<stop offset="0.132901" stop-color="#CA2366"/>
<stop offset="0.619792" stop-color="#F22C7C"/>
<stop offset="0.847593" stop-color="#D1286C"/>
</linearGradient>
<linearGradient id="paint1_linear_60_43" x1="320.324" y1="47.4014" x2="1108.42" y2="44.7729" gradientUnits="userSpaceOnUse">
<stop stop-color="#C31E60"/>
<stop offset="1" stop-color="#E5357C"/>
</linearGradient>
<linearGradient id="paint2_linear_60_43" x1="62.9755" y1="521" x2="847.494" y2="521" gradientUnits="userSpaceOnUse">
<stop offset="0.0838196" stop-color="#D4296E"/>
<stop offset="0.404818" stop-color="#EC2C79"/>
<stop offset="0.876023" stop-color="#DF3177"/>
</linearGradient>
<linearGradient id="paint3_linear_60_43" x1="797.84" y1="107.629" x2="1600.5" y2="106.98" gradientUnits="userSpaceOnUse">
<stop offset="0.132901" stop-color="#CA2366"/>
<stop offset="0.263408" stop-color="#EF2C7B"/>
<stop offset="0.770655" stop-color="#F22C7C"/>
<stop offset="0.864363" stop-color="#D1286C"/>
</linearGradient>
<linearGradient id="paint4_linear_60_43" x1="320.324" y1="47.4014" x2="1108.42" y2="44.7729" gradientUnits="userSpaceOnUse">
<stop stop-color="#C31E60"/>
<stop offset="1" stop-color="#E5357C"/>
</linearGradient>
<linearGradient id="paint5_linear_60_43" x1="62.9755" y1="521" x2="847.494" y2="521" gradientUnits="userSpaceOnUse">
<stop offset="0.0838196" stop-color="#D4296E"/>
<stop offset="0.257567" stop-color="#EC2C79"/>
<stop offset="0.680794" stop-color="#F12D7C"/>
<stop offset="0.876023" stop-color="#DF3177"/>
</linearGradient>
<linearGradient id="paint6_linear_60_43" x1="208.413" y1="25.4182" x2="465.44" y2="850.838" gradientUnits="userSpaceOnUse">
<stop stop-color="#C11D5F"/>
<stop offset="1" stop-color="#E7367D"/>
</linearGradient>
<linearGradient id="paint7_linear_60_43" x1="1335.1" y1="246.297" x2="4160.61" y2="488.356" gradientUnits="userSpaceOnUse">
<stop stop-color="#C11D5F"/>
<stop offset="1" stop-color="#E3347A"/>
</linearGradient>
<linearGradient id="paint8_linear_60_43" x1="1335.1" y1="246.297" x2="4160.61" y2="488.356" gradientUnits="userSpaceOnUse">
<stop stop-color="#C11D5F"/>
<stop offset="1" stop-color="#E3347A"/>
</linearGradient>
<linearGradient id="paint9_linear_60_43" x1="1335.1" y1="246.297" x2="4160.61" y2="488.356" gradientUnits="userSpaceOnUse">
<stop stop-color="#C11D5F"/>
<stop offset="1" stop-color="#E3347A"/>
</linearGradient>
<linearGradient id="paint10_linear_60_43" x1="1335.1" y1="246.297" x2="4160.61" y2="488.356" gradientUnits="userSpaceOnUse">
<stop stop-color="#C11D5F"/>
<stop offset="1" stop-color="#E3347A"/>
</linearGradient>
<linearGradient id="paint11_linear_60_43" x1="1335.1" y1="246.297" x2="4160.61" y2="488.356" gradientUnits="userSpaceOnUse">
<stop stop-color="#C11D5F"/>
<stop offset="1" stop-color="#E3347A"/>
</linearGradient>
<linearGradient id="paint12_linear_60_43" x1="1335.1" y1="246.297" x2="4160.61" y2="488.356" gradientUnits="userSpaceOnUse">
<stop stop-color="#C11D5F"/>
<stop offset="1" stop-color="#E3347A"/>
</linearGradient>
<linearGradient id="paint13_linear_60_43" x1="1335.1" y1="246.297" x2="4160.61" y2="488.356" gradientUnits="userSpaceOnUse">
<stop stop-color="#C11D5F"/>
<stop offset="1" stop-color="#E3347A"/>
</linearGradient>
</defs>
</svg>`

