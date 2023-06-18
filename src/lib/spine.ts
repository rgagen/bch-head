enum VertebralLevel {
  C1, C2, C3, C4, C5, C6, C7,
  T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12,
  L1, L2, L3, L4, L5,
  S1, S2, S3, S4, S5,
}

enum MotionSegmentLevel {
  C1C2, C2C3, C3C4, C4C5, C5C6, C6C7, C7T1,
  T1T2, T2T3, T3T4, T4T5, T5T6, T6T7, T7T8, T8T9, T9T10, T10T11, T11T12, T12L1,
  L1L2, L2L3, L3L4, L4L5, L5S1,
  S1S2, S2S3, S3S4, S4S5,
}

enum Side {
  Left,
  Right,
}

enum DiscPathology {
  Discbar,
  Bulge,
  Herniation,
  Fissure,
}

interface Disc {
  pathology: DiscPathology[],
}

interface FacetJoint {
  side: Side,
}

interface CentralCanal {

}

interface LateralRecess {
  side: Side,
}

interface ExitForamina {
  side: Side,
}

interface MotionSegment {
  level: MotionSegmentLevel,
  disc: Disc,
  facetJoint: FacetJoint[],
  centralCanal: CentralCanal,
  lateralRecess: LateralRecess[],
  exitForamina: ExitForamina[],
}

class Spine {
  motionSegments: MotionSegment[] = [];
}