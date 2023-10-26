
let dict: { [key: string]: string[] } = {
    "し": ["si", "shi"],
    "しゃ": ["sha", "sya"],
    "ゃ": ["lya", "xya"],
    "も": ["mo"],
    "じ": ["zi", "ji"],
    "じゃ": ["zya", "ja"],
    "っ": ["ltu", "xtu", "ltsu", "xtsu"],
    "く": ["ku"]
};

export function setup() {
    console.log("setup!!");
}

export function kanaToAlphabet(kana: string): string[] | undefined {
    return dict[kana];
}
