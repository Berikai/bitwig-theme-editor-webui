<script>
    export let value;
    export let selected

    import { onMount } from "svelte";
    import Pickr from "@simonwep/pickr";
    import "@simonwep/pickr/dist/themes/monolith.min.css";

    import { default_theme, ThemeStore } from "../Scripts/Theme";
  
    let pickr;
  
    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
        if (pickr != null && pickr != undefined && pickr.getColor() != null && pickr.getColor().toHEXA() != theme[selected][value] && theme != undefined && theme[selected] != undefined && theme[selected][value] != undefined){
            pickr.setColor(theme[selected][value]);
        }
    });

    onMount(() => {
        // @ts-ignore
        Pickr.I18N_DEFAULTS["btn:cancel"] = "Reset" // Modified to be the reset button

        pickr = Pickr.create({
            el: ".color-picker",
            theme: "monolith", // 'classic', 'monolith', 'nano'
            default: theme[selected][value],
      
            components: {
              preview: false,
              opacity: theme[selected][value].length == 9 ? true : false,
              hue: true,
      
              interaction: {
                hex: false,
                rgba: false,
                hsla: false,
                input: true,
                save: false,
                cancel: true // Modified to be the reset button
              }
            }
        });

        pickr.on("cancel", (color, instance) => {
            pickr.setColor(default_theme[selected][value]);

            ThemeStore.update((_value) => {
                _value[selected][value] = default_theme[selected][value];
                return _value;
            });
        });
  
        pickr.on("change", (color, instance) => {
            const selectedColor = color.toHEXA().toString();

            pickr.setColor(selectedColor);

            ThemeStore.update((_value) => {
                _value[selected][value] = selectedColor;
                return _value;
            });
        });
    
        return () => {
            pickr.destroyAndRemove();
        };
    });
</script>
  
<div class="color-picker"></div>
  