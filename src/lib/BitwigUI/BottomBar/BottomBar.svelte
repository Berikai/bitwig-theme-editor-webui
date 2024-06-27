<script>
    import { onMount } from "svelte";
    import { ThemeStore } from "../../Theme";
    import { scrollToValue } from "../../scrollToValue";

    onMount(() => {
        document.getElementById("bottom_bar").addEventListener("mousedown", (e) => {
            scrollToValue(e, "Window background")
        });
    });

    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
    });
</script>

<div id="bottom_bar">
    <aside>
        <span class="inspector">
            <svg width="19px" height="19px" viewBox="0 0 19 19" fill={theme["window"]["On"]} style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <path d="M9.507,6.55C9.09,6.536 8.767,6.405 8.53,6.175C8.288,5.94 8.157,5.615 8.157,5.19C8.157,5.186 8.157,5.183 8.157,5.18C8.171,4.755 8.319,4.406 8.595,4.13C8.874,3.851 9.226,3.708 9.655,3.708C10.088,3.708 10.419,3.831 10.657,4.055C10.9,4.283 11.033,4.607 11.033,5.034C11.033,5.474 10.89,5.834 10.614,6.117C10.337,6.402 9.973,6.55 9.517,6.55C9.514,6.55 9.511,6.55 9.507,6.55ZM9.534,15.292C9.067,15.292 8.721,15.144 8.488,14.878C8.265,14.624 8.139,14.248 8.139,13.741C8.139,13.306 8.228,12.773 8.409,12.143C8.41,12.142 8.41,12.14 8.411,12.138C8.585,11.572 8.674,11.061 8.674,10.603C8.674,10.401 8.65,10.228 8.597,10.083C8.559,9.979 8.481,9.903 8.37,9.847C8.154,9.739 7.994,9.633 7.887,9.532C7.733,9.388 7.657,9.211 7.657,9C7.657,8.784 7.747,8.544 7.955,8.289C8.135,8.07 8.366,7.886 8.652,7.74C8.942,7.592 9.237,7.519 9.534,7.519C10.049,7.519 10.386,7.724 10.565,8.098C10.712,8.406 10.792,8.81 10.792,9.31C10.792,9.83 10.705,10.533 10.527,11.419C10.44,11.856 10.395,12.21 10.395,12.483C10.395,12.672 10.425,12.821 10.512,12.919C10.619,13.041 10.793,13.157 11.027,13.274C11.031,13.275 11.035,13.277 11.038,13.28C11.243,13.393 11.343,13.565 11.343,13.793C11.343,13.956 11.286,14.163 11.153,14.407C11.028,14.635 10.831,14.841 10.556,15.02C10.283,15.198 9.943,15.292 9.534,15.292Z" style="fill-rule:nonzero;"/>
                </g>
            </svg>
        </span>
        <span class="seperator">
            <svg width="20" height="20" viewBox="0 0 20 20">
                <line x1="10" y1="0" x2="10" y2="20" stroke="#888888" stroke-width="1" />
            </svg>
        </span>
        <span>
            <i style="color: {theme["window"]["On"]}; font-weight: bold;">ARRANGE</i>
            <i>MIX</i>
            <i>EDIT</i>
        </span>
        <span class="seperator">
            <svg width="20" height="20" viewBox="0 0 20 20">
                <line x1="10" y1="0" x2="10" y2="20" stroke="#888888" stroke-width="1" />
            </svg>
        </span>
        <span class="bottom-button">
            <svg width="19px" height="19px" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <rect x="4" y="4" width="3" height="2" fill="#888888"/>
                    <rect x="8" y="8" width="3" height="2" fill="#888888"/>
                    <rect x="12" y="6" width="3" height="2" fill="#888888"/>
                    <rect x="12" y="10" width="3" height="2" fill="#888888"/>
                    <rect x="8" y="13" width="3" height="2" fill="#888888"/>
                    <rect x="4" y="13" width="3" height="2" fill="#888888"/>
                </g>
            </svg>
        </span>
        <span class="bottom-button">
            <!--TODO: Fix scaling-->
            <svg width="19px" height="19px" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
                <g>
                    <circle cx="12.75" cy="6.25" r="2.38" style="fill:none;stroke-width:1.2px;" stroke="#888888"/>
                    <circle cx="6.25" cy="12.75" r="2.38" style="fill:none;stroke-width:1.2px;" stroke="#888888"/>
                </g>
                <svg viewBox="0 0 19 19">
                    <path d="M8,11L11,8" style="fill:none;stroke-width:1.2px;" stroke="#888888"/>
                </svg>
            </svg>
        </span>
        <span class="bottom-button">
            <svg width="19px" height="19px" fill={theme["window"]["On"]} style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <g>
                        <svg viewBox="0 0 19 19">
                            <path d="M17,4.482C17,3.112 15.888,2 14.518,2L4.482,2C3.112,2 2,3.112 2,4.482L2,14.518C2,15.888 3.112,17 4.482,17L14.518,17C15.888,17 17,15.888 17,14.518L17,4.482Z" style="fill-opacity:0.3;"/>
                            <path d="M17,4.482L17,14.518C17,15.888 15.888,17 14.518,17L4.482,17C3.112,17 2,15.888 2,14.518L2,4.482C2,3.112 3.112,2 4.482,2L14.518,2C15.888,2 17,3.112 17,4.482ZM16,4.482C16,3.664 15.336,3 14.518,3L4.482,3C3.664,3 3,3.664 3,4.482L3,14.518C3,15.336 3.664,16 4.482,16L14.518,16C15.336,16 16,15.336 16,14.518L16,4.482Z"/>                
                        </svg>    
                    </g>
                    <rect x="2.882" y="3" width="3.118" height="13"/>
                </g>
            </svg>
        </span>
        <span class="bottom-button">
            <svg width="19px" height="19px" viewBox="0 0 19 19" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <path fill="#888888" d="M4,7L4,3.5C4,3.224 4.224,3 4.5,3C4.776,3 5,3.224 5,3.5L5,7L6,7C6.552,7 7,7.448 7,8L7,9C7,9.552 6.552,10 6,10L5,10L5,15.5C5,15.776 4.776,16 4.5,16C4.224,16 4,15.776 4,15.5L4,10L3,10C2.448,10 2,9.552 2,9L2,8C2,7.448 2.448,7 3,7L4,7ZM6,8.5C6,8.362 5.888,8.25 5.75,8.25L3.25,8.25C3.112,8.25 3,8.362 3,8.5C3,8.638 3.112,8.75 3.25,8.75L5.75,8.75C5.888,8.75 6,8.638 6,8.5Z"/>
                    <path fill="#888888" d="M9,11L9,3.5C9,3.224 9.224,3 9.5,3C9.776,3 10,3.224 10,3.5L10,11L11,11C11.552,11 12,11.448 12,12L12,13C12,13.552 11.552,14 11,14L10,14L10,15.5C10,15.776 9.776,16 9.5,16C9.224,16 9,15.776 9,15.5L9,14L8,14C7.448,14 7,13.552 7,13L7,12C7,11.448 7.448,11 8,11L9,11ZM11,12.5C11,12.362 10.888,12.25 10.75,12.25L8.25,12.25C8.112,12.25 8,12.362 8,12.5C8,12.638 8.112,12.75 8.25,12.75L10.75,12.75C10.888,12.75 11,12.638 11,12.5Z"/>
                    <path fill="#888888" d="M14,5L14,3.5C14,3.224 14.224,3 14.5,3C14.776,3 15,3.224 15,3.5L15,5L16,5C16.552,5 17,5.448 17,6L17,7C17,7.552 16.552,8 16,8L15,8L15,15.5C15,15.776 14.776,16 14.5,16C14.224,16 14,15.776 14,15.5L14,8L13,8C12.448,8 12,7.552 12,7L12,6C12,5.448 12.448,5 13,5L14,5ZM16,6.5C16,6.362 15.888,6.25 15.75,6.25L13.25,6.25C13.112,6.25 13,6.362 13,6.5C13,6.638 13.112,6.75 13.25,6.75L15.75,6.75C15.888,6.75 16,6.638 16,6.5Z"/>
                </g>
            </svg>
        </span>
    </aside>
    <aside>
        <span class="bottom-button">
            <svg width="19px" height="19px" viewBox="0 0 19 19" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <path fill={theme["window"]["On"]} d="M15.41,14.957C15.567,14.8 15.655,14.587 15.655,14.366C15.655,14.144 15.567,13.932 15.41,13.775C14.484,12.849 12.794,11.16 12.794,11.16C13.332,10.316 13.625,9.337 13.625,8.312C13.625,6.892 13.072,5.559 12.069,4.555C11.065,3.551 9.731,3 8.312,3C6.892,3 5.558,3.553 4.555,4.556C3.552,5.559 2.999,6.892 2.999,8.312C2.999,9.732 3.552,11.065 4.555,12.068C5.558,13.072 6.893,13.623 8.312,13.623C9.338,13.623 10.315,13.33 11.159,12.794C11.159,12.794 12.849,14.484 13.776,15.41C14.102,15.736 14.631,15.736 14.957,15.41C15.104,15.262 15.263,15.104 15.41,14.957ZM5.699,10.925C5,10.227 4.616,9.299 4.616,8.312C4.616,7.325 5,6.398 5.699,5.699C6.397,5.001 7.325,4.617 8.312,4.617C9.297,4.617 10.226,5.001 10.924,5.699C11.623,6.398 12.008,7.325 12.008,8.312C12.008,9.299 11.624,10.227 10.926,10.925C10.226,11.624 9.298,12.006 8.312,12.006C7.325,12.006 6.397,11.624 5.699,10.925Z" style="fill-rule:nonzero;"/>
                </g>
            </svg>
        </span>
        <span class="bottom-button">
            <svg width="19px" height="19px" viewBox="0 0 19 19" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <path fill="#888888" d="M5.54,15.999C4.689,16 3.999,15.311 3.998,14.46C3.995,11.96 3.989,7.047 3.987,4.546C3.986,4.138 4.148,3.745 4.437,3.456C4.725,3.167 5.117,3.004 5.526,3.004C7.189,3.002 9.602,3 9.602,3L15,8L15,14.455C15,15.305 14.311,15.995 13.46,15.996C11.364,15.997 7.635,15.998 5.54,15.999Z" style="fill:url(#_Linear1);fill-rule:nonzero;"/>
                    <path fill="#888888" d="M9.5,3L9.602,3L15,8L9.5,8L9.5,3Z"/>
                </g>
                <defs>
                    <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(7.97727,-10.6364,10.6364,7.97727,4.18182,16)"><stop offset="0" style="stop-color:#888888;stop-opacity:1"/><stop offset="0.41" style="stop-color:#888888;stop-opacity:1"/><stop offset="1" style="stop-color:#888888;stop-opacity:0.49"/></linearGradient>
                </defs>
            </svg>
        </span>
        <span class="bottom-button">
            <svg width="19px" height="19px" viewBox="0 0 19 19" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <path fill="#888888" d="M15,4C15.5,5.25 15.878,7.689 16,9.5C16.12,11.287 16.296,13.452 15.729,14.867C15.311,15.914 14.714,17.133 13.464,17.133C10.821,17.864 8.179,17.927 5.536,17.133C4.286,17.133 3.689,15.914 3.271,14.867C2.704,13.452 2.88,11.287 3,9.5C3.122,7.689 3.5,5.25 4,4C4.37,3.076 4.896,2 6,2C8.333,1.525 10.667,1.504 13,2C14.104,2 14.63,3.076 15,4ZM9.5,3.684C8.837,3.684 8.298,4.223 8.298,4.886C8.298,5.549 8.837,6.087 9.5,6.087C10.163,6.087 10.702,5.549 10.702,4.886C10.702,4.223 10.163,3.684 9.5,3.684ZM9.5,6.973C7.135,6.973 5.215,8.894 5.215,11.259C5.215,13.624 7.135,15.544 9.5,15.544C11.865,15.544 13.785,13.624 13.785,11.259C13.785,8.894 11.865,6.973 9.5,6.973ZM9.5,9.778C10.318,9.778 10.981,10.441 10.981,11.259C10.981,12.076 10.318,12.74 9.5,12.74C8.682,12.74 8.019,12.076 8.019,11.259C8.019,10.441 8.682,9.778 9.5,9.778Z"/>
                </g>
            </svg>
        </span>
        <span class="bottom-button">
            <svg width="19px" height="19px" viewBox="0 0 19 19" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <path fill="#888888" d="M6.668,16C5.749,15.486 4.629,14.939 4.305,14.133C3.539,12.229 1.942,10.091 3.123,9.419C4.305,8.909 4.185,9.879 5.487,11.273L5.487,4.182C5.487,4.182 5.487,3 6.668,3C7.85,3 7.732,4.182 7.732,4.182L7.85,10.091C7.85,7.727 7.85,6.545 9.032,6.545C10.214,6.545 10.214,7.727 10.214,10.091C10.214,7.727 10.261,7.006 11.395,6.991C12.53,6.976 12.577,8.669 12.577,11.273C12.577,8.909 12.66,7.652 13.759,7.727C15.023,7.748 14.94,11.003 14.94,11.003L14.94,14.39C14.94,14.39 14.949,15.084 14.547,15.513C14.091,16 13.597,16 13.597,16L6.668,16" style="fill-rule:nonzero;"/>
                </g>
            </svg>
        </span>
        <span class="seperator">
            <svg width="20" height="20" viewBox="0 0 20 20">
                <line x1="10" y1="0" x2="10" y2="20" stroke="#888888" stroke-width="1" />
            </svg>
        </span>
        <span class="bottom-button">
            <svg width="19px" height="19px" viewBox="0 0 19 19" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g>
                    <path fill="#888888" d="M16,3L16,16L12.063,16L12.063,10.81L12.672,10.81C12.934,10.81 13.146,10.598 13.146,10.336L13.146,3L16,3ZM10.495,3L10.495,10.336C10.495,10.598 10.708,10.81 10.969,10.81L11.578,10.81L11.578,16L7.422,16L7.422,10.81L8.031,10.81C8.292,10.81 8.505,10.598 8.505,10.336L8.505,3L10.495,3ZM5.854,3L5.854,10.336C5.854,10.598 6.066,10.81 6.328,10.81L6.937,10.81L6.937,16L3,16L3,3L5.854,3Z"/>
                </g>
            </svg>
        </span>
    </aside>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 34px;
        opacity: 1; /* Development only, set to 1 in production */
    }
    aside {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-left: 10px;
        padding-right: 10px;
    }
    span {
        display: flex;
        justify-content: center;
    }
    i {
        margin-top: 7px;
        margin-left: 4px;
        margin-right: 13px;
        font-size: 11px;
    }
    .inspector{
        margin-top: 5px;
        margin-left: 3px;
        margin-right: 0px;
    }
    .bottom-button{
        margin-top: 5px;
        margin-left: 4px;
        margin-right: 6px;
    }
    .seperator {
        margin-top: 5px;
        margin-left: 0px;
        margin-right: 0px;
    }
</style>