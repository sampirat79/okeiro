# Senior TypeScript/Node Engineer - Medical Observation API Coding Test

## 🎯 **Specific Challenges to Address**

### Challenge 1: **Medical Classification**

Medical observations need standardized identification. Research LOINC (Logical Observation Identifiers Names and Codes) or similar standards. How would you:

- Map "Hémoglobine" from one lab and "Hemoglobin" from another to the same standard code?
  > [SG]: A first approach would be to try to remove accents and some letters, but it's a too random technique to be considered.
  > [SG]: As found at this address: https://loinc.org/718-7 LOINC database seems to provide many translations for codes. I think the best solution would be to have a relation table between LOINC codes and terms in multiple languages. This way it would be easy to find LOINC code corresponding to a specific term.
- Handle the fact that LOINC codes specify measurement type (mass/volume) but not specific units?
  > [SG]: LOINC codes specify the type of measurement to identify what is being measured. The specific units can then be different but represent the same value.

### Challenge 2: **Unit Complexity**

The same observation can be expressed in different units:

- Glucose: mmol/L vs mg/dL
- Cholesterol: g/L vs mg/dL
- How do you handle conversions while preserving original data?
  > [SG]: Since original values cannot be modified, we need to save original values and to convert them when we need to display them in another unit. Next, it can be helpful to identify the frequency and cost of conversions to determine if they should be saved in a secondary column.
- How do you ensure meaningful comparisons in your display?
  > [SG]: All values must be in the same unit when comparing them, even if they are displayed in a different unit.

### Challenge 3: **Temporal Display**

When displaying data in tables/charts:

- How do you handle multiple tests on the same day?
  > [SG]: The reports indicate a sampling time, so it's possible to display two values ​​on the same day but at different times in different columns. In the case where two tests were performed on the same sample (which would therefore have the same time), it might be possible to average the two values ​​to display only one entry (this type of operation must nevertheless be validated with professionals)
- How to display X axis ?
  > [SG]: The spacing between points on the graph must obviously be proportional to the time between the samples. Otherwise, this can cause incorrect readings of the graph.
- How do you calculate meaningful deltas when units might differ between tests?
  > [SG]: Exactly the same as when comparing values: all values must be converted in the same unit to compute positive or negative variations between multiple tests

### Challenge 4: **Data Integrity**

- Original lab values cannot be modified (legal requirement)
- But users need to see normalized/converted values for comparison
- How do you design your schema to support both needs?
  > [SG]: I think it can be a good idea to set up an unit selector to allow users to work with units they usually use. It may be useful to identify if there is some standards for medical observations units depending on the country or laboratory for example. This could serve as their default units.
