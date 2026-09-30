import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Devices the signed-in user keeps on their dashboard.
 *
 * A signed-out visitor gets an empty list rather than an error, so the
 * gallery can render before anyone signs in. Writes require a user.
 */
export const listSaved = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];

    const rows = await ctx.db
      .query("savedDevices")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Newest first, so the dashboard reads like a recent shelf.
    return rows.sort((a, b) => b.savedAt - a.savedAt).map((row) => row.deviceId);
  },
});

/** Adds or removes a device. Returns the state after the write. */
export const toggleSaved = mutation({
  args: { deviceId: v.string() },
  handler: async (ctx, { deviceId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Please sign in to save devices to your dashboard.");
    }

    const existing = await ctx.db
      .query("savedDevices")
      .withIndex("by_user_device", (q) =>
        q.eq("userId", userId).eq("deviceId", deviceId),
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { saved: false };
    }

    await ctx.db.insert("savedDevices", {
      userId,
      deviceId,
      savedAt: Date.now(),
    });
    return { saved: true };
  },
});

/** Empties the dashboard list in one go. */
export const clearSaved = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return { removed: 0 };

    const rows = await ctx.db
      .query("savedDevices")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    for (const row of rows) {
      await ctx.db.delete(row._id);
    }
    return { removed: rows.length };
  },
});
