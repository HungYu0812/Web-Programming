---
title: NTUEE3035_WP1092_HW2
tags: Homework_description
description: 描述hw2解法
---

# 按鈕功能
------------
## 一. 圖片數量
* 切換左右按鈕可看到3張圖片

## 二. Lazy loading
* 實現圖片載入前先顯示齒輪gif
* 利用Intersection Observer API實現此功能

## 三. addEventListener
* 利用callback function來達到切換圖片
* 支援左右按鈕按到底會無法再按，但也會顯示最後那張圖片以及source
* 當實際圖片下載完，會從齒輪gif切換至該張實際圖片

## 四. Reference
* https://medium.com/@mingjunlu/lazy-loading-images-via-the-intersection-observer-api-72da50a884b7