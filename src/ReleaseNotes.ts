export const releaseNotes = `
### Version 1.2: Relationships Update
_19.09.2020_

- Relationships updated
- New \`image\` frontmatter element added

#### Relationships
Version 1.2 updated the way RPG Manager handles relationships between elements. All the links in a note are now automatically read as a relationships between elements.
If you want to specify a description in the relationship, you can add the link in the frontmatter.
In the frontmatter, the old structure has been replaced with a simple list of links with their description. Each link can be written as a markdown link, without the need to remove the brackets any longer.

\`---\`
\`[[Link to another element]]: "Relationship details"\`
\`---\`

The frontmatters have been automatically upgraded in all your notes to reflect this change.

#### New image frontmatter element
A new frontmatter element (\`image\`) has been added to the frontmatter. it accepts a valid url to an image, and instead of using a local image, RPG Manager will show the image of the \`image\` frontmatter.
If a local image exists in the vault, that will be used and the \`image\` frontmatter will be ignored. 
`;
