# Bullet Points

## Example

To make a bullet point, simply make a paragraph into a bullet point:

```ts
doc.addSection({
    children: [
        new Paragraph({
            text: "Bullet points",
            bullet: {
            level: 0 //How deep you want the bullet to be
          }
        }),
        new Paragraph({
            text: "Are awesome",
            bullet: {
            level: 0
          }
        })
    ],
});
```

### This will produce:

-   Bullet points
-   Are awesome
