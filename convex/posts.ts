import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const getPosts = query({
  args: {
    paginationOpts: v.any(), // Convex pagination opts
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_creation")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getPublishedPosts = query({
  args: {
    paginationOpts: v.any(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_creation")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    templateImage: v.string(),
    author: v.optional(v.string()),
    language: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    sourceLinks: v.optional(v.array(v.string())),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
