export const checkImageLimitSize = (imageFile, limit) => {
  const { size } = imageFile;

  const megaBytes = Math.pow(1024, 2);
  const checkBytesImage = size / megaBytes;

  if (checkBytesImage <= limit) {
    return true;
  } else {
    return false;
  }
};

export const itemConditionList = [
  {
    id: 1,
    title: "Brand new",
    value: "brand-new",
    descriptionGenerated: "Still on the package (0% deduction)",
    description: "Still on the package",
    deduction: 0,
  },
  {
    id: 2,
    title: "Like new",
    value: "like-new",
    descriptionGenerated: "Looks like new (10% deduction)",
    description: "Looks like new",
    deduction: 0.1,
  },
  {
    id: 3,
    title: "Lightly used",
    value: "lightly-used",
    descriptionGenerated: "Has a small defect (15% deduction)",
    description: "Has a small defect",
    deduction: 0.15,
  },
  {
    id: 4,
    title: "Well used",
    value: "well-used",
    descriptionGenerated: "Has a medium defect (25% deduction)",
    description: "Has a medium defect",
    deduction: 0.25,
  },
  {
    id: 5,
    title: "Heavily used",
    value: "heavily-used",
    descriptionGenerated: "Has a defect (50% deduction)",
    description: "Has a defect",
    deduction: 0.5,
  },
  {
    id: 6,
    title: "Not good",
    value: "not-good",
    descriptionGenerated: "Not playable (70% deduction)",
    description: "Not playable",
    deduction: 0.7,
  },
];
