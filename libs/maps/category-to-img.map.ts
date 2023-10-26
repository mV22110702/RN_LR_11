import { Asset } from 'expo-asset';
const [{ localUri:motherboards }] = await Asset.loadAsync(require('/../assets/motherboards.jpg'));
const [{ localUri:processors }] = await Asset.loadAsync(require('/../assets/processors.jpg'));
const [{ localUri:ram }] = await Asset.loadAsync(require('/../assets/ram.jpg'));
const [{ localUri:videoCards }] = await Asset.loadAsync(require('/../assets/video_cards.jpg'));
const [{ localUri:soundCards }] = await Asset.loadAsync(require('/../assets/sound_cards.jpg'));
const [{ localUri:hardDisks }] = await Asset.loadAsync(require('/../assets/hard_disks.jpg'));
const [{ localUri:opticalDrives }] = await Asset.loadAsync(require('/../assets/optical_drives.jpg'));
const [{ localUri:powerSupplies }] = await Asset.loadAsync(require('/../assets/power_supplies.jpg'));
const [{ localUri:housings }] = await Asset.loadAsync(require('/../assets/housings.jpg'));
const [{ localUri:coolingSystems }] = await Asset.loadAsync(require('/../assets/cooling_systems.jpg'));
const [{ localUri:ups }] = await Asset.loadAsync(require('/../assets/ups.jpg'));
const [{ localUri:ssd }] = await Asset.loadAsync(require('/../assets/ssd.gif'));
const [{ localUri:videoCaptureCards }] = await Asset.loadAsync(require('/../assets/video_capture_cards.jpg'));
const [{ localUri:upsBatteriesAndAccessories }] = await Asset.loadAsync(require('/../assets/ups_batteries_and_accessories.jpg'));
const [{ localUri:keyboardsAndMice }] = await Asset.loadAsync(require('/../assets/keyboards_and_mice.jpg'));
const [{ localUri:raidControllers }] = await Asset.loadAsync(require('/../assets/raid_controllers.jpg'));
const [{ localUri:miniComputers }] = await Asset.loadAsync(require('/../assets/mini_computers.jpg'));
const [{ localUri:miningEquipment }] = await Asset.loadAsync(require('/../assets/mining_equipment.jpg'));
const categoryToImg = {
  [CategoryName.MOTHERBOARDS]: motherboards,
  [CategoryName.PROCESSORS]: processors,
  [CategoryName.RAM]: ram,
  [CategoryName.VIDEO_CARDS]: videoCards,
  [CategoryName.SOUND_CARDS]: soundCards,
  [CategoryName.HARD_DISKS]: hardDisks,
  [CategoryName.OPTICAL_DRIVES]: opticalDrives,
  [CategoryName.POWER_SUPPLIES]: powerSupplies,
  [CategoryName.HOUSINGS]: housings,
  [CategoryName.COOLING_SYSTEMS]: coolingSystems,
  [CategoryName.UPS]: ups,
  [CategoryName.SSD]: ssd,
  [CategoryName.VIDEO_CAPTURE_CARDS]: videoCaptureCards,
  [CategoryName.UPS_BATTERIES_AND_ACCESSORIES]: upsBatteriesAndAccessories,
  [CategoryName.KEYBOARDS_AND_MICE]: keyboardsAndMice,
  [CategoryName.RAID_CONTROLLERS]: raidControllers,
  [CategoryName.MINI_COMPUTERS]: miniComputers,
  [CategoryName.MINING_EQUIPMENT]: miningEquipment,
} as const;

export { categoryToImg };
