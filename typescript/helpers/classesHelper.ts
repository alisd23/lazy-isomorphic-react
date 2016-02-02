
// Helper which takes in the ORIGINAL string class and returns the real class name
// it maps to in the styles object
 export default function(classes: string, stylesheets: any[]) {
   const mergedSheet = Object.assign({}, ...stylesheets);
   return classes.split(' ')
    .map((c) => mergedSheet[c] || c)
    .join(' ');
 }
