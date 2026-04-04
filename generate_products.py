import json

files = [
"1.png", "2.png", "BABA LOVELY POP BLUEBERRY MARKUP.png", "BABA LOVELY POP GUAVA MARKUP.png", 
"BABA LOVELY POP MANGO MARKUP.png", "BABA LOVELY POP ORANGE MARKUP.png", "BABA LOVELY POP STRAWBERRY ICECREAM MARKUP.png", 
"BABA LOVELY POP STRAWBERRY MARKUP.png", "BABA LOVELY POP WATERMELON MARKUP.png", "BABA MILK FRESH Markup.png", 
"Boost Chocolate.png", "DJ American Biscuits Markup Combine.png", "DJ American Biscuits Markup.png", 
"DJ BUTTER COOKIES.png", "DJ Bigg Boom Markup.png", "DJ Boost wheat.png", "DJ Butter and Milk Candy.png", 
"DJ Butter pop markup.png", "DJ CASHEW COOKIE DISPLAY.png", "DJ CASHEW COOKIES.png", "DJ CHOCOCHIP COOKIES.png", 
"DJ CHOCOHIP COOKIE DISPLAY.png", "DJ COCONUT COOKIE DISPLAY.png", "DJ COCONUT COOKIES.png", "DJ COCOVIBE AI.png", 
"DJ CREAM CHOCOLATE MARKUP.png", "DJ CREAM COMBINE.png", "DJ CREAM FRESH MARKUP.png", "DJ CREAM MANGO MARKUP.png", 
"DJ CREAM PINEAPPLE MARKUP.png", "DJ CREAM STRAWBERRY MARKUP.png", "DJ CREAM VANILLA MARKUP.png", 
"DJ CREMO CHOCOLATE Markup.png", "DJ CREMO COMBINE.png", "DJ CREMO MANGO markup.png", "DJ CREMO ORANGE Markup.png", 
"DJ CREMO PINEAPPLE Markup.png", "DJ CREMO STRAWBERRY MARKUP.png", "DJ CREMO VANILLA Markup.png", 
"DJ Choco Eclairs Jar Markup.png", "DJ Choco Eclairs Markup Pouch.png", "DJ Chocofull Toffee Markup.png", 
"DJ Chocolate Jar Markup.png", "DJ Coconut Desire Toffee Markup.png", "DJ Coconut Eclairs Jar Markup.png", 
"DJ Coconut Jar Markup.png", "DJ Cocovibe Markup.png", "DJ Color Pop Markup.png", "DJ Conico Chocolate.png", 
"DJ Conico Mango.png", "DJ Conico Orange.png", "DJ Conico Strawberry.png", "DJ Creamy Topper Combine.png", 
"DJ Creamy topper Chocolate Markup.png", "DJ Creamy topper Mango Markup.png", "DJ Creamy topper Orange Markup.png", 
"DJ Creamy topper Strawberry Markup.png", "DJ FINGER SHORTBREAD COOKIES DISPLAY.png", "DJ FINGER SHORTBREAD COOKIES.png", 
"DJ FRENZY AI.png", "DJ Football Markup.png", "DJ Frenzy Markup.png", "DJ Frubon Jar Markup.png", 
"DJ Frubon Pouch Markup.png", "DJ Fruit Shots Toffee Markup.png", "DJ Fruitoo lollipops markup.png", 
"DJ Fruits Candy Markup.png", "DJ Glucose Markup.png", "DJ Gum Pops Markup.png", "DJ LOL Candy Markup.png", 
"DJ Love Pop Markup.png", "DJ MILK COOKIES.png", "DJ Milk Candy Markup.png", "DJ Milk Eclairs Jar Markup.png", 
"DJ Milk Plus Markup.png", "DJ Milk Pop Markup.png", "DJ Milkshake Toffee Markup.png", "DJ Mint Cool Candy Markup.png", 
"DJ My Milk Markup Jar.png", "DJ Nice Markup.png", "DJ OLIVARY Bubblegum Markup.png", 
"DJ ORIGINAL SHORTBREAD COOKIES DISPLAY.png", "DJ ORIGINAL SHORTBREAD.png", "DJ PISTACHIO COOKIES DISPLAY.png", 
"DJ PISTACHIO COOKIES.png", "DJ Plutoo Candy Markup.png", "DJ SHORT BREAD COOKIES.png", 
"DJ SHORTBREAD DELICIOUS COOKIES DISPLAY.png", "DJ STARVIBE AI.png", "DJ SUPERB COOKIES.png", 
"DJ Starvibe Markup.png", "DJ Superb Plus Cookies.png", "DJ TAMARIND BLAST MARKUP.png", 
"DJ TANGY TAMARIND Markup.png", "DJ Wafers Chocolate.png", "DJ Wafers Strawberry.png", "DJ Wafers Vanilla.png", 
"DJ Whistle Lollipops Markup.png", "DJ Yogurt Pop Lollipop Markup.png", "Maravila ChocolatevMarkup.png", 
"Maravila Orange Markup.png", "Maravila StrawberryMarkup.png", "Maravilha Vanilla Markup.png", 
"Maravilha combine markup.png", "TICK TICK FRUITY MILKY.png", "TICK TICK LEMON.png", "TICK TICK LYCHEE.png", 
"TICK TICK MENTHOL.png", "TICK TICK PEANUT.png", "TICK TICK TAMARIND.png"
]

def determine_category(name):
    name_low = name.lower()
    if 'pop' in name_low or 'lollipop' in name_low:
        if 'butter pop' in name_low or 'color pop' in name_low:
            return 'Candies & Toffees'
        return 'Lollipops'
    if 'wafer' in name_low or 'maravilha' in name_low or 'maravila' in name_low:
        return 'Wafers'
    if 'biscuit' in name_low or 'cookie' in name_low or 'cream' in name_low or 'cremo' in name_low or 'shortbread' in name_low or 'nice' in name_low or 'glucose' in name_low or 'boost' in name_low or 'superb' in name_low:
        return 'Cookies & Biscuits'
    if 'gum' in name_low or 'bubble' in name_low:
        return 'Bubble Gum'
    return 'Candies & Toffees'

def determine_name(name):
    return name.replace('.png', '').replace('Markup', '').replace('Combine', '').replace('DISPLAY', '').replace('AI', '').replace('Jar', '').replace('Pouch', '').replace('Markup', '').replace('markup', '').replace('combine', '').strip()

out = []
id_cnt = 100

for f in files:
    if f in ["1.png", "2.png", "about.png", "file.png", "girl.png", "globe.png", "hero.png", "next.png", "vercel.png", "window.png", "TREE-INDIA-LOGO-CDR.png"]:
        continue
        
    c = determine_category(f)
    n = determine_name(f)
    n = " ".join(n.split())
    
    # Do some additional cleaning
    n = n.replace('vMarkup', '')
    
    out.append({
        "id": id_cnt,
        "name": n,
        "category": c,
        "image": f"/transparent/{f}",
        "specs": "Export Grade",
        "price": "Standard Unit"
    })
    id_cnt += 1

print("export const allStaticProducts = " + json.dumps(out, indent=2) + ";")
