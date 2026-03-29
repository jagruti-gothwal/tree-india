"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCircle2, ChevronRight, PackageSearch, Play, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = ["All", "Cookies & Biscuits", "Wafers", "Candies & Toffees", "Lollipops", "Bubble Gum"];

const products = [
  // Lollipops
  { name: "Baba Lovely Pop Blueberry", category: "Lollipops", image: "/BABA LOVELY POP BLUEBERRY MARKUP.png" },
  { name: "Baba Lovely Pop Guava", category: "Lollipops", image: "/BABA LOVELY POP GUAVA MARKUP.png" },
  { name: "Baba Lovely Pop Mango", category: "Lollipops", image: "/BABA LOVELY POP MANGO MARKUP.png" },
  { name: "Baba Lovely Pop Orange", category: "Lollipops", image: "/BABA LOVELY POP ORANGE MARKUP.png" },
  { name: "Baba Lovely Pop Strawberry Icecream", category: "Lollipops", image: "/BABA LOVELY POP STRAWBERRY ICECREAM MARKUP.png" },
  { name: "Baba Lovely Pop Strawberry", category: "Lollipops", image: "/BABA LOVELY POP STRAWBERRY MARKUP.png" },
  { name: "Baba Lovely Pop Watermelon", category: "Lollipops", image: "/BABA LOVELY POP WATERMELON MARKUP.png" },
  { name: "DJ Butter Pop", category: "Lollipops", image: "/DJ Butter pop markup.png" },
  { name: "DJ Color Pop", category: "Lollipops", image: "/DJ Color Pop Markup.png" },
  { name: "DJ Love Pop", category: "Lollipops", image: "/DJ Love Pop Markup.png" },
  { name: "DJ Milk Pop", category: "Lollipops", image: "/DJ Milk Pop Markup.png" },
  { name: "DJ Whistle Lollipops", category: "Lollipops", image: "/DJ Whistle Lollipops Markup.png" },
  { name: "DJ Yogurt Pop Lollipop", category: "Lollipops", image: "/DJ Yogurt Pop Lollipop Markup.png" },
  { name: "DJ Fruitoo Lollipops", category: "Lollipops", image: "/DJ Fruitoo lollipops markup.png" },

  // Cookies & Biscuits
  { name: "DJ American Biscuits Combine", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup Combine.png" },
  { name: "DJ American Biscuits", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup.png" },
  { name: "DJ Butter Cookies", category: "Cookies & Biscuits", image: "/DJ Butter Cookies.png" },
  { name: "DJ Cashew Cookie Display", category: "Cookies & Biscuits", image: "/DJ CASHEW COOKIE DISPLAY.png" },
  { name: "DJ Cashew Cookies", category: "Cookies & Biscuits", image: "/DJ CASHEW COOKIES.png" },
  { name: "DJ Chocochip Cookies", category: "Cookies & Biscuits", image: "/DJ CHOCOCHIP COOKIES.png" },
  { name: "DJ Chocochip Cookie Display", category: "Cookies & Biscuits", image: "/DJ CHOCOHIP COOKIE DISPLAY.png" },
  { name: "DJ Coconut Cookie Display", category: "Cookies & Biscuits", image: "/DJ COCONUT COOKIE DISPLAY.png" },
  { name: "DJ Coconut Cookies", category: "Cookies & Biscuits", image: "/DJ COCONUT COOKIES.png" },
  { name: "DJ Finger Shortbread Cookies Display", category: "Cookies & Biscuits", image: "/DJ FINGER SHORTBREAD COOKIES DISPLAY.png" },
  { name: "DJ Finger Shortbread Cookies", category: "Cookies & Biscuits", image: "/DJ FINGER SHORTBREAD COOKIES.png" },
  { name: "DJ Milk Cookies", category: "Cookies & Biscuits", image: "/DJ Milk Cookies.png" },
  { name: "DJ Original Shortbread Cookies Display", category: "Cookies & Biscuits", image: "/DJ ORIGINAL SHORTBREAD COOKIES DISPLAY.png" },
  { name: "DJ Original Shortbread", category: "Cookies & Biscuits", image: "/DJ ORIGINAL SHORTBREAD.png" },
  { name: "DJ Pistachio Cookies Display", category: "Cookies & Biscuits", image: "/DJ PISTACHIO COOKIES DISPLAY.png" },
  { name: "DJ Pistachio Cookies", category: "Cookies & Biscuits", image: "/DJ PISTACHIO COOKIES.png" },
  { name: "DJ Short Bread Cookies", category: "Cookies & Biscuits", image: "/DJ SHORT BREAD COOKIES.png" },
  { name: "DJ Shortbread Delicious Cookies Display", category: "Cookies & Biscuits", image: "/DJ SHORTBREAD DELICIOUS COOKIES DISPLAY.png" },
  { name: "DJ Superb Plus Cookies", category: "Cookies & Biscuits", image: "/DJ Superb Plus Cookies.png" },
  { name: "DJ Creamy Topper Chocolate", category: "Cookies & Biscuits", image: "/DJ Creamy topper Chocolate Markup.png" },
  { name: "DJ Creamy Topper Mango", category: "Cookies & Biscuits", image: "/DJ Creamy topper Mango Markup.png" },
  { name: "DJ Creamy Topper Orange", category: "Cookies & Biscuits", image: "/DJ Creamy topper Orange Markup.png" },
  { name: "DJ Creamy Topper Strawberry", category: "Cookies & Biscuits", image: "/DJ Creamy topper Strawberry Markup.png" },
  { name: "DJ Creamy Topper Combine", category: "Cookies & Biscuits", image: "/DJ Creamy Topper Combine.png" },
  
  // New moved from candies
  { name: "Boost Chocolate Biscuit", category: "Cookies & Biscuits", image: "/Boost Chocolate.png" },
  { name: "DJ Boost Wheat Biscuit", category: "Cookies & Biscuits", image: "/DJ Boost wheat.png" },
  { name: "DJ Glucose Biscuit", category: "Cookies & Biscuits", image: "/DJ Glucose Markup.png" },
  { name: "DJ Nice Biscuit", category: "Cookies & Biscuits", image: "/DJ Nice Markup.png" },
  { name: "DJ Cream Chocolate", category: "Cookies & Biscuits", image: "/DJ CREAM CHOCOLATE MARKUP.png" },
  { name: "DJ Cream Combine", category: "Cookies & Biscuits", image: "/DJ CREAM COMBINE.png" },
  { name: "DJ Cream Fresh", category: "Cookies & Biscuits", image: "/DJ CREAM FRESH MARKUP.png" },
  { name: "DJ Cream Mango", category: "Cookies & Biscuits", image: "/DJ CREAM MANGO MARKUP.png" },
  { name: "DJ Cream Pineapple", category: "Cookies & Biscuits", image: "/DJ CREAM PINEAPPLE MARKUP.png" },
  { name: "DJ Cream Strawberry", category: "Cookies & Biscuits", image: "/DJ CREAM STRAWBERRY MARKUP.png" },
  { name: "DJ Cream Vanilla", category: "Cookies & Biscuits", image: "/DJ CREAM VANILLA MARKUP.png" },
  { name: "DJ Cremo Chocolate", category: "Cookies & Biscuits", image: "/DJ CREMO CHOCOLATE Markup.png" },
  { name: "DJ Cremo Combine", category: "Cookies & Biscuits", image: "/DJ CREMO COMBINE.png" },
  { name: "DJ Cremo Mango", category: "Cookies & Biscuits", image: "/DJ CREMO MANGO markup.png" },
  { name: "DJ Cremo Orange", category: "Cookies & Biscuits", image: "/DJ CREMO ORANGE Markup.png" },
  { name: "DJ Cremo Pineapple", category: "Cookies & Biscuits", image: "/DJ CREMO PINEAPPLE Markup.png" },
  { name: "DJ Cremo Strawberry", category: "Cookies & Biscuits", image: "/DJ CREMO STRAWBERRY MARKUP.png" },
  { name: "DJ Cremo Vanilla", category: "Cookies & Biscuits", image: "/DJ CREMO VANILLA Markup.png" },
  { name: "DJ Conico Chocolate", category: "Cookies & Biscuits", image: "/DJ Conico Chocolate.png" },
  { name: "DJ Conico Mango", category: "Cookies & Biscuits", image: "/DJ Conico Mango.png" },
  { name: "DJ Conico Orange", category: "Cookies & Biscuits", image: "/DJ Conico Orange.png" },
  { name: "DJ Conico Strawberry", category: "Cookies & Biscuits", image: "/DJ Conico Strawberry.png" },

  // Wafers
  { name: "DJ Wafers Chocolate", category: "Wafers", image: "/DJ Wafers Chocolate.png" },
  { name: "DJ Wafers Strawberry", category: "Wafers", image: "/DJ Wafers Strawberry.png" },
  { name: "DJ Wafers Vanilla", category: "Wafers", image: "/DJ Wafers Vanilla.png" },
  { name: "Maravilha Chocolate", category: "Wafers", image: "/Maravila ChocolatevMarkup.png" },
  { name: "Maravilha Orange", category: "Wafers", image: "/Maravila Orange Markup.png" },
  { name: "Maravilha Strawberry", category: "Wafers", image: "/Maravila StrawberryMarkup.png" },
  { name: "Maravilha Vanilla", category: "Wafers", image: "/Maravilha Vanilla Markup.png" },
  { name: "Maravilha Combine", category: "Wafers", image: "/Maravilha combine markup.png" },

  // Candies & Toffees
  { name: "Baba Milk Fresh", category: "Cookies & Biscuits", image: "/BABA MILK FRESH Markup.png" },
  { name: "DJ Bigg Boom", category: "Candies & Toffees", image: "/DJ Bigg Boom Markup.png" },
  { name: "DJ Butter and Milk Candy", category: "Candies & Toffees", image: "/DJ Butter and Milk Candy.png" },
  { name: "DJ Cocovibe AI", category: "Candies & Toffees", image: "/DJ COCOVIBE AI.png" },
  { name: "DJ Cocovibe", category: "Candies & Toffees", image: "/DJ Cocovibe Markup.png" },
  { name: "DJ Choco Eclairs Jar", category: "Candies & Toffees", image: "/DJ Choco Eclairs Jar Markup.png" },
  { name: "DJ Choco Eclairs Pouch", category: "Candies & Toffees", image: "/DJ Choco Eclairs Markup Pouch.png" },
  { name: "DJ Chocofull Toffee", category: "Candies & Toffees", image: "/DJ Chocofull Toffee Markup.png" },
  { name: "DJ Chocolate Jar", category: "Candies & Toffees", image: "/DJ Chocolate Jar Markup.png" },
  { name: "DJ Coconut Desire Toffee", category: "Candies & Toffees", image: "/DJ Coconut Desire Toffee Markup.png" },
  { name: "DJ Coconut Eclairs Jar", category: "Candies & Toffees", image: "/DJ Coconut Eclairs Jar Markup.png" },
  { name: "DJ Coconut Jar", category: "Candies & Toffees", image: "/DJ Coconut Jar Markup.png" },
  { name: "DJ Frenzy AI", category: "Candies & Toffees", image: "/DJ FRENZY AI.png" },
  { name: "DJ Frenzy", category: "Candies & Toffees", image: "/DJ Frenzy Markup.png" },
  { name: "DJ Football", category: "Cookies & Biscuits", image: "/DJ Football Markup.png" },
  { name: "DJ Frubon Jar", category: "Candies & Toffees", image: "/DJ Frubon Jar Markup.png" },
  { name: "DJ Frubon Pouch", category: "Candies & Toffees", image: "/DJ Frubon Pouch Markup.png" },
  { name: "DJ Fruit Shots Toffee", category: "Candies & Toffees", image: "/DJ Fruit Shots Toffee Markup.png" },
  { name: "DJ Fruits Candy", category: "Candies & Toffees", image: "/DJ Fruits Candy Markup.png" },
  { name: "DJ LOL Candy", category: "Candies & Toffees", image: "/DJ LOL Candy Markup.png" },
  { name: "DJ Milk Candy", category: "Candies & Toffees", image: "/DJ Milk Candy Markup.png" },
  { name: "DJ Milk Eclairs Jar", category: "Candies & Toffees", image: "/DJ Milk Eclairs Jar Markup.png" },
  { name: "DJ Milk Plus", category: "Cookies & Biscuits", image: "/DJ Milk Plus Markup.png" },
  { name: "DJ Milkshake Toffee", category: "Candies & Toffees", image: "/DJ Milkshake Toffee Markup.png" },
  { name: "DJ Mint Cool Candy", category: "Candies & Toffees", image: "/DJ Mint Cool Candy Markup.png" },
  { name: "DJ My Milk Jar", category: "Candies & Toffees", image: "/DJ My Milk Markup Jar.png" },
  { name: "DJ Plutoo Candy", category: "Candies & Toffees", image: "/DJ Plutoo Candy Markup.png" },
  { name: "DJ Starvibe AI", category: "Candies & Toffees", image: "/DJ STARVIBE AI.png" },
  { name: "DJ Starvibe", category: "Candies & Toffees", image: "/DJ Starvibe Markup.png" },
  { name: "DJ Tamarind Blast", category: "Candies & Toffees", image: "/DJ TAMARIND BLAST MARKUP.png" },
  { name: "DJ Tangy Tamarind", category: "Candies & Toffees", image: "/DJ TANGY TAMARIND Markup.png" },
  { name: "Tick Tick Fruity Milky", category: "Candies & Toffees", image: "/TICK TICK FRUITY MILKY.png" },
  { name: "Tick Tick Lemon", category: "Candies & Toffees", image: "/TICK TICK LEMON.png" },
  { name: "Tick Tick Lychee", category: "Candies & Toffees", image: "/TICK TICK LYCHEE.png" },
  { name: "Tick Tick Menthol", category: "Candies & Toffees", image: "/TICK TICK MENTHOL.png" },
  { name: "Tick Tick Peanut", category: "Candies & Toffees", image: "/TICK TICK PEANUT.png" },
  { name: "Tick Tick Tamarind", category: "Candies & Toffees", image: "/TICK TICK TAMARIND.png" },

  // Bubble Gum
  { name: "DJ Olivary Bubblegum", category: "Bubble Gum", image: "/DJ OLIVARY Bubblegum Markup.png" },
  { name: "DJ Gum Pops", category: "Bubble Gum", image: "/DJ Gum Pops Markup.png" }
].map((p, idx) => ({ ...p, id: idx + 1, price: "Export Grade" }));

import { fetchAllProducts } from "../admin/actions";

const staticProducts = [
  // Lollipops
  { name: "Baba Lovely Pop Blueberry", category: "Lollipops", image: "/BABA LOVELY POP BLUEBERRY MARKUP.png" },
  { name: "Baba Lovely Pop Guava", category: "Lollipops", image: "/BABA LOVELY POP GUAVA MARKUP.png" },
  { name: "Baba Lovely Pop Mango", category: "Lollipops", image: "/BABA LOVELY POP MANGO MARKUP.png" },
  { name: "Baba Lovely Pop Orange", category: "Lollipops", image: "/BABA LOVELY POP ORANGE MARKUP.png" },
  { name: "Baba Lovely Pop Strawberry Icecream", category: "Lollipops", image: "/BABA LOVELY POP STRAWBERRY ICECREAM MARKUP.png" },
  { name: "Baba Lovely Pop Strawberry", category: "Lollipops", image: "/BABA LOVELY POP STRAWBERRY MARKUP.png" },
  { name: "Baba Lovely Pop Watermelon", category: "Lollipops", image: "/BABA LOVELY POP WATERMELON MARKUP.png" },
  { name: "DJ Butter Pop", category: "Lollipops", image: "/DJ Butter pop markup.png" },
  { name: "DJ Color Pop", category: "Lollipops", image: "/DJ Color Pop Markup.png" },
  { name: "DJ Love Pop", category: "Lollipops", image: "/DJ Love Pop Markup.png" },
  { name: "DJ Milk Pop", category: "Lollipops", image: "/DJ Milk Pop Markup.png" },
  { name: "DJ Whistle Lollipops", category: "Lollipops", image: "/DJ Whistle Lollipops Markup.png" },
  { name: "DJ Yogurt Pop Lollipop", category: "Lollipops", image: "/DJ Yogurt Pop Lollipop Markup.png" },
  { name: "DJ Fruitoo Lollipops", category: "Lollipops", image: "/DJ Fruitoo lollipops markup.png" },

  // Cookies & Biscuits
  { name: "DJ American Biscuits Combine", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup Combine.png" },
  { name: "DJ American Biscuits", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup.png" },
  { name: "DJ Butter Cookies", category: "Cookies & Biscuits", image: "/DJ Butter Cookies.png" },
  { name: "DJ Cashew Cookie Display", category: "Cookies & Biscuits", image: "/DJ CASHEW COOKIE DISPLAY.png" },
  { name: "DJ Cashew Cookies", category: "Cookies & Biscuits", image: "/DJ CASHEW COOKIES.png" },
  { name: "DJ Chocochip Cookies", category: "Cookies & Biscuits", image: "/DJ CHOCOCHIP COOKIES.png" },
  { name: "DJ Chocochip Cookie Display", category: "Cookies & Biscuits", image: "/DJ CHOCOHIP COOKIE DISPLAY.png" },
  { name: "DJ Coconut Cookie Display", category: "Cookies & Biscuits", image: "/DJ COCONUT COOKIE DISPLAY.png" },
  { name: "DJ Coconut Cookies", category: "Cookies & Biscuits", image: "/DJ COCONUT COOKIES.png" },
  { name: "DJ Finger Shortbread Cookies Display", category: "Cookies & Biscuits", image: "/DJ FINGER SHORTBREAD COOKIES DISPLAY.png" },
  { name: "DJ Finger Shortbread Cookies", category: "Cookies & Biscuits", image: "/DJ FINGER SHORTBREAD COOKIES.png" },
  { name: "DJ Milk Cookies", category: "Cookies & Biscuits", image: "/DJ Milk Cookies.png" },
  { name: "DJ Original Shortbread Cookies Display", category: "Cookies & Biscuits", image: "/DJ ORIGINAL SHORTBREAD COOKIES DISPLAY.png" },
  { name: "DJ Original Shortbread", category: "Cookies & Biscuits", image: "/DJ ORIGINAL SHORTBREAD.png" },
  { name: "DJ Pistachio Cookies Display", category: "Cookies & Biscuits", image: "/DJ PISTACHIO COOKIES DISPLAY.png" },
  { name: "DJ Pistachio Cookies", category: "Cookies & Biscuits", image: "/DJ PISTACHIO COOKIES.png" },
  { name: "DJ Short Bread Cookies", category: "Cookies & Biscuits", image: "/DJ SHORT BREAD COOKIES.png" },
  { name: "DJ Shortbread Delicious Cookies Display", category: "Cookies & Biscuits", image: "/DJ SHORTBREAD DELICIOUS COOKIES DISPLAY.png" },
  { name: "DJ Superb Plus Cookies", category: "Cookies & Biscuits", image: "/DJ Superb Plus Cookies.png" },
  { name: "DJ Creamy Topper Chocolate", category: "Cookies & Biscuits", image: "/DJ Creamy topper Chocolate Markup.png" },
  { name: "DJ Creamy Topper Mango", category: "Cookies & Biscuits", image: "/DJ Creamy topper Mango Markup.png" },
  { name: "DJ Creamy Topper Orange", category: "Cookies & Biscuits", image: "/DJ Creamy topper Orange Markup.png" },
  { name: "DJ Creamy Topper Strawberry", category: "Cookies & Biscuits", image: "/DJ Creamy topper Strawberry Markup.png" },
  { name: "DJ Creamy Topper Combine", category: "Cookies & Biscuits", image: "/DJ Creamy Topper Combine.png" },
  
  // New moved from candies
  { name: "Boost Chocolate Biscuit", category: "Cookies & Biscuits", image: "/Boost Chocolate.png" },
  { name: "DJ Boost Wheat Biscuit", category: "Cookies & Biscuits", image: "/DJ Boost wheat.png" },
  { name: "DJ Glucose Biscuit", category: "Cookies & Biscuits", image: "/DJ Glucose Markup.png" },
  { name: "DJ Nice Biscuit", category: "Cookies & Biscuits", image: "/DJ Nice Markup.png" },
  { name: "DJ Cream Chocolate", category: "Cookies & Biscuits", image: "/DJ CREAM CHOCOLATE MARKUP.png" },
  { name: "DJ Cream Combine", category: "Cookies & Biscuits", image: "/DJ CREAM COMBINE.png" },
  { name: "DJ Cream Fresh", category: "Cookies & Biscuits", image: "/DJ CREAM FRESH MARKUP.png" },
  { name: "DJ Cream Mango", category: "Cookies & Biscuits", image: "/DJ CREAM MANGO MARKUP.png" },
  { name: "DJ Cream Pineapple", category: "Cookies & Biscuits", image: "/DJ CREAM PINEAPPLE MARKUP.png" },
  { name: "DJ Cream Strawberry", category: "Cookies & Biscuits", image: "/DJ CREAM STRAWBERRY MARKUP.png" },
  { name: "DJ Cream Vanilla", category: "Cookies & Biscuits", image: "/DJ CREAM VANILLA MARKUP.png" },
  { name: "DJ Cremo Chocolate", category: "Cookies & Biscuits", image: "/DJ CREMO CHOCOLATE Markup.png" },
  { name: "DJ Cremo Combine", category: "Cookies & Biscuits", image: "/DJ CREMO COMBINE.png" },
  { name: "DJ Cremo Mango", category: "Cookies & Biscuits", image: "/DJ CREMO MANGO markup.png" },
  { name: "DJ Cremo Orange", category: "Cookies & Biscuits", image: "/DJ CREMO ORANGE Markup.png" },
  { name: "DJ Cremo Pineapple", category: "Cookies & Biscuits", image: "/DJ CREMO PINEAPPLE Markup.png" },
  { name: "DJ Cremo Strawberry", category: "Cookies & Biscuits", image: "/DJ CREMO STRAWBERRY MARKUP.png" },
  { name: "DJ Cremo Vanilla", category: "Cookies & Biscuits", image: "/DJ CREMO VANILLA Markup.png" },
  { name: "DJ Conico Chocolate", category: "Cookies & Biscuits", image: "/DJ Conico Chocolate.png" },
  { name: "DJ Conico Mango", category: "Cookies & Biscuits", image: "/DJ Conico Mango.png" },
  { name: "DJ Conico Orange", category: "Cookies & Biscuits", image: "/DJ Conico Orange.png" },
  { name: "DJ Conico Strawberry", category: "Cookies & Biscuits", image: "/DJ Conico Strawberry.png" },

  // Wafers
  { name: "DJ Wafers Chocolate", category: "Wafers", image: "/DJ Wafers Chocolate.png" },
  { name: "DJ Wafers Strawberry", category: "Wafers", image: "/DJ Wafers Strawberry.png" },
  { name: "DJ Wafers Vanilla", category: "Wafers", image: "/DJ Wafers Vanilla.png" },
  { name: "Maravilha Chocolate", category: "Wafers", image: "/Maravila ChocolatevMarkup.png" },
  { name: "Maravilha Orange", category: "Wafers", image: "/Maravila Orange Markup.png" },
  { name: "Maravilha Strawberry", category: "Wafers", image: "/Maravila StrawberryMarkup.png" },
  { name: "Maravilha Vanilla", category: "Wafers", image: "/Maravilha Vanilla Markup.png" },
  { name: "Maravilha Combine", category: "Wafers", image: "/Maravilha combine markup.png" },

  // Candies & Toffees
  { name: "Baba Milk Fresh", category: "Cookies & Biscuits", image: "/BABA MILK FRESH Markup.png" },
  { name: "DJ Bigg Boom", category: "Candies & Toffees", image: "/DJ Bigg Boom Markup.png" },
  { name: "DJ Butter and Milk Candy", category: "Candies & Toffees", image: "/DJ Butter and Milk Candy.png" },
  { name: "DJ Cocovibe AI", category: "Candies & Toffees", image: "/DJ COCOVIBE AI.png" },
  { name: "DJ Cocovibe", category: "Candies & Toffees", image: "/DJ Cocovibe Markup.png" },
  { name: "DJ Choco Eclairs Jar", category: "Candies & Toffees", image: "/DJ Choco Eclairs Jar Markup.png" },
  { name: "DJ Choco Eclairs Pouch", category: "Candies & Toffees", image: "/DJ Choco Eclairs Markup Pouch.png" },
  { name: "DJ Chocofull Toffee", category: "Candies & Toffees", image: "/DJ Chocofull Toffee Markup.png" },
  { name: "DJ Chocolate Jar", category: "Candies & Toffees", image: "/DJ Chocolate Jar Markup.png" },
  { name: "DJ Coconut Desire Toffee", category: "Candies & Toffees", image: "/DJ Coconut Desire Toffee Markup.png" },
  { name: "DJ Coconut Eclairs Jar", category: "Candies & Toffees", image: "/DJ Coconut Eclairs Jar Markup.png" },
  { name: "DJ Coconut Jar", category: "Candies & Toffees", image: "/DJ Coconut Jar Markup.png" },
  { name: "DJ Frenzy AI", category: "Candies & Toffees", image: "/DJ FRENZY AI.png" },
  { name: "DJ Frenzy", category: "Candies & Toffees", image: "/DJ Frenzy Markup.png" },
  { name: "DJ Football", category: "Cookies & Biscuits", image: "/DJ Football Markup.png" },
  { name: "DJ Frubon Jar", category: "Candies & Toffees", image: "/DJ Frubon Jar Markup.png" },
  { name: "DJ Frubon Pouch", category: "Candies & Toffees", image: "/DJ Frubon Pouch Markup.png" },
  { name: "DJ Fruit Shots Toffee", category: "Candies & Toffees", image: "/DJ Fruit Shots Toffee Markup.png" },
  { name: "DJ Fruits Candy", category: "Candies & Toffees", image: "/DJ Fruits Candy Markup.png" },
  { name: "DJ LOL Candy", category: "Candies & Toffees", image: "/DJ LOL Candy Markup.png" },
  { name: "DJ Milk Candy", category: "Candies & Toffees", image: "/DJ Milk Candy Markup.png" },
  { name: "DJ Milk Eclairs Jar", category: "Candies & Toffees", image: "/DJ Milk Eclairs Jar Markup.png" },
  { name: "DJ Milk Plus", category: "Cookies & Biscuits", image: "/DJ Milk Plus Markup.png" },
  { name: "DJ Milkshake Toffee", category: "Candies & Toffees", image: "/DJ Milkshake Toffee Markup.png" },
  { name: "DJ Mint Cool Candy", category: "Candies & Toffees", image: "/DJ Mint Cool Candy Markup.png" },
  { name: "DJ My Milk Jar", category: "Candies & Toffees", image: "/DJ My Milk Markup Jar.png" },
  { name: "DJ Plutoo Candy", category: "Candies & Toffees", image: "/DJ Plutoo Candy Markup.png" },
  { name: "DJ Starvibe AI", category: "Candies & Toffees", image: "/DJ STARVIBE AI.png" },
  { name: "DJ Starvibe", category: "Candies & Toffees", image: "/DJ Starvibe Markup.png" },
  { name: "DJ Tamarind Blast", category: "Candies & Toffees", image: "/DJ TAMARIND BLAST MARKUP.png" },
  { name: "DJ Tangy Tamarind", category: "Candies & Toffees", image: "/DJ TANGY TAMARIND Markup.png" },
  { name: "Tick Tick Fruity Milky", category: "Candies & Toffees", image: "/TICK TICK FRUITY MILKY.png" },
  { name: "Tick Tick Lemon", category: "Candies & Toffees", image: "/TICK TICK LEMON.png" },
  { name: "Tick Tick Lychee", category: "Candies & Toffees", image: "/TICK TICK LYCHEE.png" },
  { name: "Tick Tick Menthol", category: "Candies & Toffees", image: "/TICK TICK MENTHOL.png" },
  { name: "Tick Tick Peanut", category: "Candies & Toffees", image: "/TICK TICK PEANUT.png" },
  { name: "Tick Tick Tamarind", category: "Candies & Toffees", image: "/TICK TICK TAMARIND.png" },

  // Bubble Gum
  { name: "DJ Olivary Bubblegum", category: "Bubble Gum", image: "/DJ OLIVARY Bubblegum Markup.png" },
  { name: "DJ Gum Pops", category: "Bubble Gum", image: "/DJ Gum Pops Markup.png" }
].map((p, idx) => ({ ...p, id: idx + 1, price: "Export Grade" }));

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [dbProducts, setDbProducts] = useState(staticProducts);


  useEffect(() => {
    async function load() {
       const res = await fetchAllProducts();
       if (res.success && res.products && res.products.length > 0) {
         setDbProducts(res.products as any);
       }
    }
    load();
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? dbProducts 
    : dbProducts.filter(p => p.category === activeCategory);

  const toggleProductSelection = (id: number) => {
    setSelectedProductIds((prev) => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedProductIds([]);

  return (
    <div className="pt-32 pb-40 bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 h-full w-full bg-slate-50 opacity-50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 pt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-200/50 bg-white/70 backdrop-blur-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[#003366] font-bold text-xs tracking-[0.2em] uppercase">
              Product Portfolio
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]"
          >
            Premium Global <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003366] to-blue-500">Exports</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto"
          >
            An extensive catalog of high-grade biscuits, candies, and confectionery carefully produced and packaged for the international market. Select multiple products to instantly generate a bulk inquiry.
          </motion.p>
        </div>

        {/* Categories Bar : Aceternity Pills */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
           className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => {
             const isActive = activeCategory === cat;
             return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-6 py-2.5 text-[13px] font-black uppercase tracking-widest rounded-full transition-all duration-300 overflow-hidden group border border-transparent hover:border-slate-200"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-[#003366] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={cn("relative z-10 transition-colors duration-300", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-800")}>
                  {cat}
                </span>
                {!isActive && (
                  <motion.span
                    className="absolute inset-0 bg-white border border-slate-200 shadow-sm rounded-full -z-10 group-hover:bg-slate-50"
                  />
                )}
              </button>
             )
          })}
        </motion.div>

        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
           <span className="text-slate-500 font-bold tracking-[0.2em] text-[10px] uppercase">
             Showing {filteredProducts.length} Products
           </span>
           <span className="text-slate-400 font-medium text-xs tracking-wide">
             Click cards to multi-select
           </span>
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => {
              const isSelected = selectedProductIds.includes(product.id);

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={product.id} 
                  onClick={() => toggleProductSelection(product.id)}
                  className={cn(
                    "relative bg-white border rounded-3xl overflow-hidden cursor-pointer group flex flex-col transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1",
                    isSelected ? "border-[#003366] shadow-[0_10px_20px_rgba(0,51,102,0.15)] ring-2 ring-[#003366]/20" : "border-slate-200/80"
                  )}
                >
                  {/* Selection Overlay */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-blue-50/50 pointer-events-none z-10 border-[3px] border-[#003366] rounded-3xl transition-all"
                      />
                    )}
                  </AnimatePresence>

                  {/* Checkbox Icon */}
                  <div className={cn(
                    "absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center z-20 transition-all shadow-sm",
                    isSelected ? "bg-[#003366] border-[#003366] text-white" : "bg-white border-slate-200 text-transparent opacity-0 group-hover:opacity-100"
                  )}>
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  
                  <div className="h-56 w-full bg-slate-50/50 flex items-center justify-center p-8 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out mix-blend-multiply relative z-0"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col w-full text-center relative z-20 bg-white">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-3">{product.category}</span>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-snug mb-4 group-hover:text-[#003366] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 mt-10 border border-slate-200 bg-white rounded-3xl">
            <p className="text-xl text-slate-500 font-medium">No products mapped in this category currently.</p>
          </div>
        )}
      </div>

      {/* Floating Selection Action Bar */}
      <AnimatePresence>
         {selectedProductIds.length > 0 && (
            <motion.div
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 100 }}
               transition={{ type: "spring", stiffness: 300, damping: 25 }}
               className="fixed bottom-8 left-0 right-0 z-[5000] flex justify-center pointer-events-none px-4"
            >
               <div className="bg-slate-900 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700 p-2 pl-6 pointer-events-auto flex items-center gap-6">
                  <div className="flex items-center gap-3">
                     <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black text-sm">
                        {selectedProductIds.length}
                     </span>
                     <span className="text-white font-bold text-sm tracking-wide hidden sm:block">
                        Products Selected
                     </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <button onClick={clearSelection} className="p-2 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full">
                        <X className="w-4 h-4" />
                     </button>
                     <Link
                        href={`/contact?items=${selectedProductIds.join(",")}`}
                        className="bg-white text-slate-900 hover:bg-slate-100 flex items-center gap-2 px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-colors"
                     >
                        <span className="hidden sm:block">Proceed to Inquiry</span>
                        <span className="sm:hidden">Inquire</span>
                        <ChevronRight className="w-4 h-4" />
                     </Link>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
}
