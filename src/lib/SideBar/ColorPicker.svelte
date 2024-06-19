<script>
    export let value;
    export let selected

    import { onMount } from "svelte";
    import Pickr from "@simonwep/pickr";
    import "@simonwep/pickr/dist/themes/monolith.min.css";

    import { theme } from "../Theme";
  
    let pickr;
  
    let themeValue;

    theme.subscribe((_value) => {
        themeValue = _value;
        if (pickr != undefined && pickr.getColor().toHEXA() != themeValue[selected][value]){
            pickr.setColor(themeValue[selected][value]);
        }
    });

    onMount(() => {
        pickr = Pickr.create({
            el: ".color-picker",
            theme: "monolith", // 'classic', 'monolith', 'nano'
            default: themeValue[selected][value],
      
            components: {
              preview: false,
              opacity: false,
              hue: true,
      
              interaction: {
                hex: false,
                rgba: false,
                hsla: false,
                input: true,
                save: false
              }
            }
        });
  
        pickr.on("change", (color, instance) => {
            const selectedColor = color.toHEXA().toString();

            pickr.setColor(selectedColor);

            theme.update((_value) => {
                _value[selected][value] = selectedColor;
                return _value;
            });

            console.log("Selected color:", selectedColor);
        });
    
        return () => {
            pickr.destroyAndRemove();
        };
    });
</script>
  
<div class="color-picker"></div>
  