<template>
  <div class="flex justify-center">
    <div class="w-4/5 flex flex-col items-center">
      <h2 class="text-2xl font-bold">
        {{ value["Handheld\n(Hover for latest updates)"] }}
      </h2>
      <p>Brand: {{ value["Brand"] }}</p>

      <p>
        Performance Rating:
        {{ value["Performance Rating"] }}
      </p>
      <p>Emulation Limit: {{ value["Emulation Limit"] }}</p>

      <p>Form Factor: {{ value["Form Factor"] }}</p>
      <p>Dimensions: {{ value["Dimensions"] }}</p>
      <p>Weight: {{ value["Weight"] }}</p>

      <p>Screen Size: {{ value["Screen Size"] }}</p>
      <p>Aspect Ratio: {{ value["Aspect Ratio"] }}</p>
      <p>
        Resolution:
        {{ value["Resolution\n(Best resolutions for retro gaming)"] }}
      </p>
      <p>PPI: {{ value["PPI\n(Pixels Per Inch)"] }}</p>

      <p>OS: {{ value["OS"] }}</p>

      <p>Connectivity: {{ value["Connectivity"] }}</p>
      <p>Storage: {{ value["Storage"] }}</p>

      <p>Price (average): {{ value["Price (average)"] }}</p>
      <p>Released: {{ value["Released"] }}</p>

      <p>Pros: {{ value["Pros"] }}</p>
      <p>Cons: {{ value["Cons"] }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value"],
};
</script>
